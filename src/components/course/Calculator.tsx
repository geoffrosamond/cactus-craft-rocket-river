import { useState, type ChangeEvent, type ReactNode } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ASSESSMENT,
  type PlanInput,
  SWING_TRAP,
  buildPlan,
  clockDuration,
  clonePlan,
  isAssessment,
  metres,
  ratioText,
} from "@/lib/anchor/model";
import { fieldClass, ghostClass, primaryClass } from "@/components/course/ui";
import { getPittwaterTides } from "@/lib/tides/pittwater";

type Props = {
  value: PlanInput;
  onChange: (next: PlanInput) => void;
  recorded: boolean;
  onRecord: () => void;
};

const PRESETS = [
  { ratio: 4, label: "4:1 light, attended" },
  { ratio: 5, label: "5:1 settled night" },
  { ratio: 7, label: "7:1 about 20 kn" },
  { ratio: 8, label: "8:1 exposed" },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-sm text-fg">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs leading-snug text-muted">{hint}</span> : null}
    </label>
  );
}

export function Calculator({ value, onChange, recorded, onRecord }: Props) {
  const plan = buildPlan(value);
  const assessment = isAssessment(value);
  const [sounder, setSounder] = useState("5.2");
  const [offset, setOffset] = useState("0.4");
  const [tideNow, setTideNow] = useState("1.6");
  const [text, setText] = useState<Record<string, string>>({});
  const [tideNote, setTideNote] = useState<string | null>(null);
  const [loadingTides, setLoadingTides] = useState(false);

  const patch = (partial: Partial<PlanInput>) => {
    onChange({ ...value, ...partial, extremes: (partial.extremes ?? value.extremes).map((point) => ({ ...point })) });
  };

  const load = (next: PlanInput) => {
    setText({});
    onChange(clonePlan(next));
  };

  const num = (key: string, current: number, apply: (parsed: number) => void) => ({
    value: text[key] ?? String(current),
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      if (!/^-?\d*\.?\d*$/.test(raw)) return;
      setText((prev) => ({ ...prev, [key]: raw }));
      const parsed = Number(raw);
      if (raw !== "" && raw !== "-" && raw !== "." && raw !== "-." && Number.isFinite(parsed)) apply(parsed);
    },
    onBlur: () =>
      setText((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      }),
  });

  const applySounder = () => {
    const depth = Number(sounder) + Number(offset) - Number(tideNow);
    if (Number.isFinite(depth)) {
      setText((prev) => {
        const next = { ...prev };
        delete next.chartDepth;
        return next;
      });
      patch({ chartDepth: Math.round(depth * 100) / 100 });
    }
  };

  const loadTides = async () => {
    setLoadingTides(true);
    setTideNote(null);
    try {
      const result = await getPittwaterTides();
      if (!result.ok) {
        setTideNote(result.error);
        return;
      }
      setText((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          if (key.startsWith("tide-")) delete next[key];
        }
        return next;
      });
      patch({ extremes: result.extremes });
      setTideNote(`WillyWeather · ${result.location}`);
    } catch {
      setTideNote("WillyWeather did not answer.");
    } finally {
      setLoadingTides(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl leading-tight">The 24-hour chart</h1>
        <p className="mt-3 text-muted">
          Enter the highs and lows that cover the stay. The curve between them is a cosine, which is the shape of a
          tide. Scope is taken from the highest roller-depth in the window. Swing is taken from the lowest.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={ghostClass} onClick={() => load(ASSESSMENT)}>
          Assessment anchorage
        </button>
        <button type="button" className={ghostClass} onClick={() => load(SWING_TRAP)}>
          60 m swing trap
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Chart depth" hint="Metres below chart datum, under the anchor.">
          <input className={fieldClass} inputMode="decimal" {...num("chartDepth", value.chartDepth, (chartDepth) => patch({ chartDepth }))} />
        </Field>
        <Field label="Bow roller above the water" hint="Freeboard to the point the chain leaves the boat.">
          <input className={fieldClass} inputMode="decimal" {...num("freeboard", value.freeboard, (freeboard) => patch({ freeboard }))} />
        </Field>
        <Field label="Length overall" hint="Lagoon 42 is 12.8 m. The stern is this far past the bow.">
          <input className={fieldClass} inputMode="decimal" {...num("loa", value.loa, (loa) => patch({ loa }))} />
        </Field>
        <Field label="Draft" hint="Used only for under-keel at low water.">
          <input className={fieldClass} inputMode="decimal" {...num("draft", value.draft, (draft) => patch({ draft }))} />
        </Field>
        <Field label="Bridle reach forward" hint="Joe’s 5–6 m shift of the centre of effort.">
          <input className={fieldClass} inputMode="decimal" {...num("bridleForward", value.bridleForward, (bridleForward) => patch({ bridleForward }))} />
        </Field>
        <Field label="Bridle loop to veer" hint="Extra chain after the hook. Unloads the windlass. Not scope.">
          <input className={fieldClass} inputMode="decimal" {...num("bridleLoop", value.bridleLoop, (bridleLoop) => patch({ bridleLoop }))} />
        </Field>
        <Field label="Chain on board">
          <input className={fieldClass} inputMode="decimal" {...num("chainOnBoard", value.chainOnBoard, (chainOnBoard) => patch({ chainOnBoard }))} />
        </Field>
        <Field label="Clearance from the anchor" hint="To the nearest boat, shoal, or shore you must not enter.">
          <input className={fieldClass} inputMode="decimal" {...num("clearance", value.clearance, (clearance) => patch({ clearance }))} />
        </Field>
        <Field label="Stay starts" hint="The window is this time, plus 24 hours.">
          <input
            className={fieldClass}
            type="time"
            value={value.stayStart}
            onChange={(event) => patch({ stayStart: event.target.value.slice(0, 5) })}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm text-fg">Scope target</legend>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => {
            const selected = value.scopeTarget === preset.ratio;
            return (
              <button
                key={preset.ratio}
                type="button"
                aria-pressed={selected}
                className={`${selected ? primaryClass : ghostClass} h-auto min-h-11 w-full whitespace-normal px-2 py-2 text-center`}
                onClick={() => patch({ scopeTarget: preset.ratio })}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted">
          The film’s light-air band starts at 3:1. A stay with a tide does not. Around 20 knots, use the top of his
          5–7× band.
        </p>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm text-fg">Low and high water on the chart</legend>
        <button type="button" className={`${primaryClass} mb-3`} disabled={loadingTides} onClick={loadTides}>
          {loadingTides ? "Loading Pittwater tides" : "Use today’s Pittwater tides"}
        </button>
        {tideNote ? <p className="mb-3 text-sm text-muted">{tideNote}</p> : null}
        <div className="space-y-3">
          {value.extremes.map((point, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Field label={index % 2 === 0 ? "Low or high time" : "Next extreme"}>
                <input
                  className={fieldClass}
                  type="time"
                  value={point.time}
                  onChange={(event) => {
                    const extremes = value.extremes.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, time: event.target.value.slice(0, 5) } : { ...item },
                    );
                    patch({ extremes });
                  }}
                />
              </Field>
              <Field label="Height above datum">
                <input
                  className={fieldClass}
                  inputMode="decimal"
                  {...num(`tide-${index}`, point.height, (height) => {
                    const extremes = value.extremes.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, height } : { ...item },
                    );
                    patch({ extremes });
                  })}
                />
              </Field>
            </div>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 rounded-md border border-line bg-surface p-3">
        <input
          type="checkbox"
          className="mt-1 size-5 accent-brass"
          checked={value.mooringField}
          onChange={(event) => patch({ mooringField: event.target.checked })}
        />
        <span>
          <span className="block text-sm">I would be dropping between mooring buoys</span>
          <span className="mt-1 block text-xs text-muted">
            That single fact blocks a pass. The film’s warning is that your circle meets boats that hardly move.
          </span>
        </span>
      </label>

      <details className="rounded-md border border-line bg-surface p-3">
        <summary className="cursor-pointer text-sm">I have a sounder reading, not chart depth</summary>
        <p className="mt-2 text-xs text-muted">
          Chart depth = sounder + transducer below the waterline − height of tide right now. Example: 5.2 + 0.4 − 1.6
          = 4.0 m.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <input className={fieldClass} inputMode="decimal" aria-label="Sounder" value={sounder} onChange={(event) => setSounder(event.target.value)} />
          <input className={fieldClass} inputMode="decimal" aria-label="Transducer offset" value={offset} onChange={(event) => setOffset(event.target.value)} />
          <input className={fieldClass} inputMode="decimal" aria-label="Tide now" value={tideNow} onChange={(event) => setTideNow(event.target.value)} />
        </div>
        <button type="button" className={`${ghostClass} mt-3`} onClick={applySounder}>
          Use this chart depth
        </button>
      </details>

      {!plan.ok ? (
        <div className="rounded-md border border-fail p-4 text-sm text-fail">
          {plan.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : (
        <Result plan={plan} clearance={value.clearance} assessment={assessment} recorded={recorded} onRecord={onRecord} />
      )}
    </div>
  );
}

function Result({
  plan,
  clearance,
  assessment,
  recorded,
  onRecord,
}: {
  plan: ReturnType<typeof buildPlan>;
  clearance: number;
  assessment: boolean;
  recorded: boolean;
  onRecord: () => void;
}) {
  const tideData = plan.samples.map((sample) => ({
    label: sample.label,
    tide: Number(sample.tide.toFixed(2)),
  }));
  const scopeData = plan.samples.map((sample) => ({
    label: sample.label,
    scope: Number(sample.scope.toFixed(2)),
    swing: Number(sample.swingRadius.toFixed(1)),
  }));
  const scopeMin = Math.min(...plan.samples.map((sample) => sample.scope));
  const scopeMax = Math.max(...plan.samples.map((sample) => sample.scope));
  const swingMax = Math.max(plan.swingAtLow, clearance);

  return (
    <div className="space-y-5">
      <div className={`rounded-md border p-4 ${plan.cleared ? "border-brass" : "border-fail"}`}>
        <p className={`font-serif text-2xl ${plan.cleared ? "text-brass" : "text-fail"}`}>
          {plan.cleared ? "Cleared to deploy" : "Not cleared"}
        </p>
        <p className="mt-2 text-sm text-muted">
          High water in this stay is {plan.high.tide.toFixed(2)} m at {plan.high.time}. Low water is{" "}
          {plan.low.tide.toFixed(2)} m at {plan.low.time}. Scope is judged on the high. Swing is judged on the low.
        </p>
        {plan.reasons.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm">
            {plan.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm">
            Working rode holds the target at high water, the low-water circle fits inside the clearance, the locker
            can spare the loop, and you are not in a mooring field.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Scope at high water" value={ratioText(plan.scopeAtHigh)} note={`Roller depth ${metres(plan.high.vertical)}`} />
        <Stat label="Swing ratio at low water" value={ratioText(plan.swingRatioAtLow)} note={`Reach ${metres(plan.horizontalAtLow)}`} />
        <Stat label="Working rode" value={metres(plan.workingRode)} note="Chain that counts as scope" />
        <Stat label="Total off the gypsy" value={metres(plan.totalVeer)} note={`Windlass time ${clockDuration(plan.windlassSeconds)}`} />
        <Stat label="Swing radius, low water" value={metres(plan.swingAtLow)} note={`High-water circle ${metres(plan.swingAtHigh)}`} />
        <Stat label="Under-keel at low water" value={metres(plan.underKeelLow)} note={`Water depth ${metres(plan.waterLow)}`} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="If you ignore tide and roller" value={metres(plan.naiveChartOnly)} note={`${ratioText(plan.naiveChartOnlyScope)} when the tide is in`} />
        <Stat label="Roller, but no tide rise" value={metres(plan.naiveNoTide)} note={`${ratioText(plan.naiveNoTideScope)} at high water`} />
        <Stat label="Pull angle at high water" value={`${plan.pullAngleAtHigh.toFixed(1)}°`} note="Off the seabed, straight-line rode" />
      </div>

      <SwingSketch radius={plan.swingAtLow} clearance={clearance} safe={plan.swingAtLow <= clearance} />

      <ChartBlock title="Tide through the stay" caption="Height above chart datum. The decision uses the real high and low, not the nearest hour.">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tideData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" interval={15} tick={{ fill: "var(--color-muted)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} tickLine={false} axisLine={false} width={36} domain={[0, "auto"]} />
            <Tooltip content={<Tip unit="m" />} />
            <Line type="monotone" dataKey="tide" name="Tide" stroke="var(--color-brass)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBlock>

      <ChartBlock title="Scope through the stay" caption="It is allowed to be richer at low water. It is not allowed to fall below the target at high water.">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scopeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" interval={15} tick={{ fill: "var(--color-muted)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} tickLine={false} axisLine={false} width={36} domain={[Math.floor(scopeMin - 1), Math.ceil(scopeMax + 1)]} />
            <Tooltip content={<Tip unit=":1" />} />
            <ReferenceLine y={plan.scopeAtHigh} stroke="var(--color-muted)" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="scope" name="Scope" stroke="var(--color-fg)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBlock>

      <ChartBlock title="Swing radius against clearance" caption="The dashed line is the room you said you have. The circle has to stay under it at low water.">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scopeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" interval={15} tick={{ fill: "var(--color-muted)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} tickLine={false} axisLine={false} width={40} domain={[0, Math.ceil(swingMax * 1.15)]} />
            <Tooltip content={<Tip unit="m" />} />
            <ReferenceLine y={clearance} stroke="var(--color-muted)" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="swing" name="Swing radius" stroke="var(--color-brass)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBlock>

      <div className="max-w-full overflow-x-auto rounded-md border border-line">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="px-3 py-2 text-left text-xs text-muted">
            Hourly look along the stay. Decision figures above use the true high and low on the curve.
          </caption>
          <thead className="text-muted">
            <tr className="border-b border-line">
              {["Time", "Tide", "Roller depth", "Scope", "Swing ratio", "Swing radius"].map((heading) => (
                <th key={heading} className="px-3 py-2 font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plan.hourly.map((row) => (
              <tr key={row.offsetMin} className="border-b border-line last:border-0">
                <td className="px-3 py-2">{row.label}</td>
                <td className="px-3 py-2">{row.tide.toFixed(2)}</td>
                <td className="px-3 py-2">{row.vertical.toFixed(1)}</td>
                <td className="px-3 py-2">{row.scope.toFixed(2)}</td>
                <td className="px-3 py-2">{row.swingRatio.toFixed(2)}</td>
                <td className="px-3 py-2">{row.swingRadius.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-md border border-line bg-surface p-4">
        <p className="text-sm">
          {assessment
            ? "This is the assessment anchorage."
            : "This is practice. Load the assessment anchorage to record a pass."}
        </p>
        {assessment && plan.cleared ? (
          <button type="button" className={`${primaryClass} mt-3 w-full sm:w-auto`} onClick={onRecord} disabled={recorded}>
            {recorded ? "Deployment recorded" : "Record this deployment"}
          </button>
        ) : null}
        {recorded ? (
          <p className="mt-2 text-xs text-muted">Written into the SCORM suspend data as a cleared 24-hour plan.</p>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl leading-none">{value}</p>
      <p className="mt-2 text-xs text-muted">{note}</p>
    </div>
  );
}

function ChartBlock({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <figure>
      <figcaption className="mb-2">
        <p className="text-sm text-fg">{title}</p>
        <p className="text-xs text-muted">{caption}</p>
      </figcaption>
      <div className="h-48 w-full min-w-0">{children}</div>
    </figure>
  );
}

function Tip({ active, payload, label, unit }: { active?: boolean; payload?: Array<{ name?: string; value?: number }>; label?: string; unit: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2 text-xs">
      <p>{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="text-muted">
          {item.name}: {item.value} {unit}
        </p>
      ))}
    </div>
  );
}

function SwingSketch({ radius, clearance, safe }: { radius: number; clearance: number; safe: boolean }) {
  const max = Math.max(radius, clearance, 1);
  const scale = 118 / max;
  const swingR = radius * scale;
  const clearR = clearance * scale;
  const stroke = safe ? "var(--color-brass)" : "var(--color-fail)";
  return (
    <figure>
      <figcaption className="mb-2 text-sm">Plan view from the anchor</figcaption>
      <svg viewBox="0 0 320 250" className="w-full" role="img" aria-label={`Swing radius ${metres(radius)} against clearance ${metres(clearance)}`}>
        <rect width="320" height="250" fill="var(--color-surface)" rx="8" />
        <circle cx="160" cy="128" r={clearR} fill="none" stroke="var(--color-muted)" strokeDasharray="4 4" />
        <circle cx="160" cy="128" r={swingR} fill="none" stroke={stroke} strokeWidth="2" />
        <circle cx="160" cy="128" r="3" fill="var(--color-fg)" />
        <text x="160" y="148" textAnchor="middle" fill="var(--color-muted)" fontSize="11">
          Anchor
        </text>
        <text x="16" y="22" fill="var(--color-muted)" fontSize="11">
          Dashed: room you have
        </text>
        <text x="16" y="238" fill={stroke} fontSize="11">
          {safe ? "Circle fits" : "Circle does not fit"} · {metres(radius)}
        </text>
      </svg>
    </figure>
  );
}
