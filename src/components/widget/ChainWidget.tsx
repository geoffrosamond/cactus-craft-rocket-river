import { useState, type ChangeEvent, type ReactNode } from "react";
import {
  ASSESSMENT,
  type PlanInput,
  buildPlan,
  clockDuration,
  clonePlan,
  metres,
  ratioText,
} from "@/lib/anchor/model";
import { fieldClass, ghostClass, primaryClass } from "@/components/course/ui";
import { getPittwaterTides } from "@/lib/tides/pittwater";

const PRESETS = [
  { ratio: 5, label: "5:1 settled" },
  { ratio: 7, label: "7:1 about 20 kn" },
  { ratio: 8, label: "8:1 exposed" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}

export function ChainWidget({ framed = false }: { framed?: boolean }) {
  const [value, setValue] = useState<PlanInput>(() => clonePlan(ASSESSMENT));
  const [text, setText] = useState<Record<string, string>>({});
  const [tideNote, setTideNote] = useState<string | null>(null);
  const [loadingTides, setLoadingTides] = useState(false);
  const plan = buildPlan(value);

  const patch = (partial: Partial<PlanInput>) => {
    setValue((current) => ({
      ...current,
      ...partial,
      extremes: (partial.extremes ?? current.extremes).map((point) => ({ ...point })),
    }));
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
    <section className={framed ? "bg-bg text-fg" : ""}>
      <header className="border-b border-line px-4 py-4">
        <p className="font-serif text-2xl leading-none tracking-tight">
          <span>ALL</span>
          <span className="text-brass">SAIL</span>
        </p>
        <p className="mt-1 text-xs tracking-widest text-muted">PITTWATER · CHURCH POINT</p>
        <h1 className="mt-4 font-serif text-3xl leading-tight">Anchor Chain Length Calculator</h1>
        <p className="mt-2 max-w-prose text-sm text-muted">
          The chain is scoped to the highest water in the next 24 hours. Swing is checked at the lowest.
        </p>
        <img
          src="/brand/impulso.jpg"
          alt="Impulso, the AllSail Lagoon, on Pittwater"
          className="mt-4 w-full border border-line"
        />
      </header>

      <div className="space-y-5 px-4 py-5">
        {plan.ok ? (
          <div className="bg-fg px-4 py-5 text-bg">
            <p className="text-xs tracking-widest text-surface-2">CHAIN TO PUT OUT</p>
            <p className="mt-1 font-serif text-5xl leading-none text-brass">{metres(plan.workingRode)}</p>
            <p className="mt-3 text-sm">
              Plus {metres(value.bridleLoop)} of bridle loop. Veer {metres(plan.totalVeer)} off the gypsy
              {plan.windlassSeconds > 0 ? `, about ${clockDuration(plan.windlassSeconds)}` : ""}.
            </p>
            <p className="mt-2 text-sm text-surface-2">
              High water {plan.high.tide.toFixed(2)} m at {plan.high.time}. Roller depth {metres(plan.high.vertical)}.
              Scope {ratioText(plan.scopeAtHigh)}.
            </p>
            <p className={`mt-3 text-sm ${plan.cleared ? "text-brass" : "text-surface"}`}>
              {plan.cleared
                ? `Low-water swing ${metres(plan.swingAtLow)} fits inside ${metres(value.clearance)}.`
                : plan.reasons[0]}
            </p>
          </div>
        ) : (
          <div className="border border-fail px-4 py-4 text-sm text-fail">
            {plan.errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Chart depth, m">
            <input className={fieldClass} inputMode="decimal" {...num("chartDepth", value.chartDepth, (chartDepth) => patch({ chartDepth }))} />
          </Field>
          <Field label="Bow roller above water, m">
            <input className={fieldClass} inputMode="decimal" {...num("freeboard", value.freeboard, (freeboard) => patch({ freeboard }))} />
          </Field>
          <Field label="Chain on board, m">
            <input className={fieldClass} inputMode="decimal" {...num("chainOnBoard", value.chainOnBoard, (chainOnBoard) => patch({ chainOnBoard }))} />
          </Field>
          <Field label="Bridle loop, m">
            <input className={fieldClass} inputMode="decimal" {...num("bridleLoop", value.bridleLoop, (bridleLoop) => patch({ bridleLoop }))} />
          </Field>
          <Field label="Length overall, m">
            <input className={fieldClass} inputMode="decimal" {...num("loa", value.loa, (loa) => patch({ loa }))} />
          </Field>
          <Field label="Room from the anchor, m">
            <input className={fieldClass} inputMode="decimal" {...num("clearance", value.clearance, (clearance) => patch({ clearance }))} />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs tracking-wide text-muted">Scope</legend>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.ratio}
                type="button"
                aria-pressed={value.scopeTarget === preset.ratio}
                className={`${value.scopeTarget === preset.ratio ? primaryClass : ghostClass} h-auto min-h-11 w-full whitespace-normal px-2 py-2 text-center`}
                onClick={() => patch({ scopeTarget: preset.ratio })}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs tracking-wide text-muted">Tide extremes for the stay</legend>
          <button type="button" className={`${primaryClass} mb-3 w-full`} disabled={loadingTides} onClick={loadTides}>
            {loadingTides ? "Loading Pittwater tides" : "Use today’s Pittwater tides"}
          </button>
          {tideNote ? <p className="mb-3 text-sm text-muted">{tideNote}</p> : null}
          <div className="space-y-2">
            {value.extremes.map((point, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                <Field label="Time">
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
                <Field label="Height, m">
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
                <button
                  type="button"
                  className={ghostClass}
                  disabled={value.extremes.length <= 2}
                  onClick={() => patch({ extremes: value.extremes.filter((_, itemIndex) => itemIndex !== index) })}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={`${ghostClass} mt-3`}
            onClick={() => patch({ extremes: [...value.extremes, { time: "12:00", height: 1 }] })}
          >
            Add a tide
          </button>
        </fieldset>

        <p className="text-xs leading-snug text-muted">
          Working chain is scope times chart depth, plus the highest tide of the stay, plus the height of the bow
          roller. The bridle loop is extra chain. It is not scope.
        </p>
      </div>
    </section>
  );
}
