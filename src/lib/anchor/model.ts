export type TidePoint = { time: string; height: number };

export type PlanInput = {
  chartDepth: number;
  freeboard: number;
  loa: number;
  draft: number;
  bridleForward: number;
  bridleLoop: number;
  chainOnBoard: number;
  clearance: number;
  scopeTarget: number;
  stayStart: string;
  mooringField: boolean;
  extremes: TidePoint[];
};

export type Sample = {
  offsetMin: number;
  label: string;
  tide: number;
  vertical: number;
  scope: number;
  swingRatio: number;
  horizontal: number;
  swingRadius: number;
};

export type TideMark = { time: string; tide: number; vertical: number };

export type PlanResult = {
  ok: boolean;
  errors: string[];
  reasons: string[];
  cleared: boolean;
  samples: Sample[];
  hourly: Sample[];
  high: TideMark;
  low: TideMark;
  workingRode: number;
  totalVeer: number;
  scopeAtHigh: number;
  scopeAtLow: number;
  swingRatioAtLow: number;
  swingRatioAtHigh: number;
  horizontalAtLow: number;
  swingAtLow: number;
  swingAtHigh: number;
  pullAngleAtHigh: number;
  underKeelLow: number;
  waterLow: number;
  naiveChartOnly: number;
  naiveChartOnlyScope: number;
  naiveNoTide: number;
  naiveNoTideScope: number;
  windlassSeconds: number;
};

export const KEEL_MARGIN = 0.5;

export const ASSESSMENT: PlanInput = {
  chartDepth: 4,
  freeboard: 1.2,
  loa: 12.8,
  draft: 1.22,
  bridleForward: 5.5,
  bridleLoop: 6,
  chainOnBoard: 80,
  clearance: 80,
  scopeTarget: 7,
  stayStart: "16:00",
  mooringField: false,
  extremes: [
    { time: "03:10", height: 0.3 },
    { time: "09:25", height: 1.9 },
    { time: "15:40", height: 0.4 },
    { time: "21:55", height: 1.7 },
  ],
};

export const SWING_TRAP: PlanInput = {
  ...ASSESSMENT,
  clearance: 60,
  extremes: ASSESSMENT.extremes.map((point) => ({ ...point })),
};

export function clonePlan(plan: PlanInput): PlanInput {
  return { ...plan, extremes: plan.extremes.map((point) => ({ ...point })) };
}

export function parseClock(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

export function formatClock(minutes: number): string {
  const wrapped = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const hour = Math.floor(wrapped / 60);
  const minute = wrapped % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function metres(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(digits)} m`;
}

export function ratioText(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}:1`;
}

export function clockDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  const total = Math.round(seconds);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min} min ${String(sec).padStart(2, "0")} s`;
}

type Extreme = { min: number; height: number };

function tideHeight(atMin: number, extremes: Extreme[]): number {
  if (extremes.length === 0) return 0;
  if (extremes.length === 1) return extremes[0].height;
  const span = 1440;
  const points: Extreme[] = [];
  for (const shift of [-span, 0, span, span * 2]) {
    for (const extreme of extremes) points.push({ min: extreme.min + shift, height: extreme.height });
  }
  points.sort((a, b) => a.min - b.min);
  let t = atMin;
  while (t < points[0].min) t += span;
  while (t > points[points.length - 1].min) t -= span;
  for (let i = 0; i < points.length - 1; i++) {
    const left = points[i];
    const right = points[i + 1];
    if (t >= left.min && t <= right.min) {
      const spanMin = right.min - left.min || 1;
      const u = (t - left.min) / spanMin;
      return left.height + (right.height - left.height) * (1 - Math.cos(Math.PI * u)) / 2;
    }
  }
  return points[points.length - 1].height;
}

function windowTide(startMin: number, extremes: Extreme[]): { maxH: number; minH: number; maxAt: number; minAt: number } {
  const end = startMin + 1440;
  let maxH = tideHeight(startMin, extremes);
  let minH = maxH;
  let maxAt = startMin;
  let minAt = startMin;
  const consider = (t: number) => {
    const height = tideHeight(t, extremes);
    if (height > maxH) {
      maxH = height;
      maxAt = t;
    }
    if (height < minH) {
      minH = height;
      minAt = t;
    }
  };
  consider(end);
  for (const extreme of extremes) {
    for (const shift of [-1440, 0, 1440, 2880]) {
      const t = extreme.min + shift;
      if (t >= startMin && t <= end) consider(t);
    }
  }
  return { maxH, minH, maxAt, minAt };
}

function blank(errors: string[]): PlanResult {
  const mark = { time: "—", tide: 0, vertical: 0 };
  return {
    ok: false,
    errors,
    reasons: [],
    cleared: false,
    samples: [],
    hourly: [],
    high: mark,
    low: mark,
    workingRode: 0,
    totalVeer: 0,
    scopeAtHigh: 0,
    scopeAtLow: 0,
    swingRatioAtLow: 0,
    swingRatioAtHigh: 0,
    horizontalAtLow: 0,
    swingAtLow: 0,
    swingAtHigh: 0,
    pullAngleAtHigh: 0,
    underKeelLow: 0,
    waterLow: 0,
    naiveChartOnly: 0,
    naiveChartOnlyScope: 0,
    naiveNoTide: 0,
    naiveNoTideScope: 0,
    windlassSeconds: 0,
  };
}

export function buildPlan(input: PlanInput): PlanResult {
  const errors: string[] = [];
  if (!Number.isFinite(input.chartDepth) || input.chartDepth <= 0) {
    errors.push("Chart depth must be greater than zero.");
  }
  if (!Number.isFinite(input.freeboard) || input.freeboard < 0) {
    errors.push("Bow-roller height cannot be negative.");
  }
  if (!Number.isFinite(input.loa) || input.loa <= 0) errors.push("Length overall must be greater than zero.");
  if (!Number.isFinite(input.draft) || input.draft <= 0) errors.push("Draft must be greater than zero.");
  if (!Number.isFinite(input.bridleForward) || input.bridleForward < 0) {
    errors.push("Bridle reach cannot be negative.");
  }
  if (!Number.isFinite(input.bridleLoop) || input.bridleLoop < 0) {
    errors.push("Bridle loop cannot be negative.");
  }
  if (!Number.isFinite(input.chainOnBoard) || input.chainOnBoard <= 0) {
    errors.push("Chain on board must be greater than zero.");
  }
  if (!Number.isFinite(input.clearance) || input.clearance <= 0) {
    errors.push("Clearance to the nearest hazard must be greater than zero.");
  }
  if (!Number.isFinite(input.scopeTarget) || input.scopeTarget < 4) {
    errors.push("Scope target must be at least 4:1 for any stay that includes a tide.");
  }
  const start = parseClock(input.stayStart);
  if (start === null) errors.push("Stay start must be a time like 16:00.");
  const extremes: Extreme[] = [];
  const seen = new Set<number>();
  if (input.extremes.length < 2) errors.push("Enter at least two tide extremes.");
  for (const point of input.extremes) {
    const min = parseClock(point.time);
    if (min === null) {
      errors.push(`Tide time “${point.time || "blank"}” is not HH:MM.`);
      continue;
    }
    if (seen.has(min)) errors.push(`Two tides share ${point.time}.`);
    seen.add(min);
    if (!Number.isFinite(point.height)) errors.push(`Tide height at ${point.time} is not a number.`);
    extremes.push({ min, height: point.height });
  }
  if (errors.length > 0 || start === null || extremes.length < 2) return blank(errors);

  const marks = windowTide(start, extremes);
  const verticalAt = (tide: number) => input.chartDepth + tide + input.freeboard;
  const dHigh = verticalAt(marks.maxH);
  const dLow = verticalAt(marks.minH);
  if (dHigh <= 0 || dLow <= 0) {
    return blank(["Roller-to-seabed is not positive. Check chart depth, tide, and freeboard."]);
  }

  const workingRode = input.scopeTarget * dHigh;
  const pointAt = (offsetMin: number): Sample => {
    const tide = tideHeight(start + offsetMin, extremes);
    const vertical = verticalAt(tide);
    const horizontal = Math.sqrt(Math.max(0, workingRode * workingRode - vertical * vertical));
    const scope = workingRode / vertical;
    return {
      offsetMin,
      label: formatClock(start + offsetMin),
      tide,
      vertical,
      scope,
      swingRatio: horizontal / vertical,
      horizontal,
      swingRadius: horizontal + input.bridleForward + input.loa,
    };
  };

  const samples: Sample[] = [];
  for (let offset = 0; offset <= 1440; offset += 15) samples.push(pointAt(offset));
  const hourly: Sample[] = [];
  for (let offset = 0; offset <= 1440; offset += 60) hourly.push(pointAt(offset));

  const highSample = pointAt(marks.maxAt - start);
  const lowSample = pointAt(marks.minAt - start);
  const waterLow = input.chartDepth + marks.minH;
  const underKeelLow = waterLow - input.draft;
  const totalVeer = workingRode + input.bridleLoop;
  const naiveChartOnly = input.scopeTarget * input.chartDepth;
  const naiveNoTide = input.scopeTarget * (input.chartDepth + input.freeboard);

  const reasons: string[] = [];
  if (input.mooringField) {
    reasons.push("The drop is between mooring buoys. Their swing is small; yours is not. Do not anchor there.");
  }
  if (totalVeer > input.chainOnBoard + 0.05) {
    reasons.push(
      `The gypsy must veer ${metres(totalVeer)} (${metres(workingRode)} of working rode plus ${metres(input.bridleLoop)} of bridle loop) and only ${metres(input.chainOnBoard)} is on board.`,
    );
  }
  if (lowSample.swingRadius > input.clearance + 0.05) {
    reasons.push(
      `Low-water swing radius is ${metres(lowSample.swingRadius)} and the nearest hazard is ${metres(input.clearance)} from the anchor.`,
    );
  }
  if (underKeelLow < KEEL_MARGIN) {
    reasons.push(
      `Low water leaves ${metres(underKeelLow)} under the ${metres(input.draft)} draft. Keep at least ${metres(KEEL_MARGIN)}.`,
    );
  }

  return {
    ok: true,
    errors: [],
    reasons,
    cleared: reasons.length === 0,
    samples,
    hourly,
    high: { time: formatClock(marks.maxAt), tide: marks.maxH, vertical: dHigh },
    low: { time: formatClock(marks.minAt), tide: marks.minH, vertical: dLow },
    workingRode,
    totalVeer,
    scopeAtHigh: workingRode / dHigh,
    scopeAtLow: workingRode / dLow,
    swingRatioAtLow: lowSample.swingRatio,
    swingRatioAtHigh: highSample.swingRatio,
    horizontalAtLow: lowSample.horizontal,
    swingAtLow: lowSample.swingRadius,
    swingAtHigh: highSample.swingRadius,
    pullAngleAtHigh: (Math.asin(Math.min(1, dHigh / workingRode)) * 180) / Math.PI,
    underKeelLow,
    waterLow,
    naiveChartOnly,
    naiveChartOnlyScope: naiveChartOnly / dHigh,
    naiveNoTide,
    naiveNoTideScope: naiveNoTide / dHigh,
    windlassSeconds: totalVeer * 2,
  };
}

export function isAssessment(input: PlanInput): boolean {
  const same = (a: number, b: number) => Math.abs(a - b) < 0.001;
  if (!same(input.chartDepth, ASSESSMENT.chartDepth)) return false;
  if (!same(input.freeboard, ASSESSMENT.freeboard)) return false;
  if (!same(input.loa, ASSESSMENT.loa)) return false;
  if (!same(input.draft, ASSESSMENT.draft)) return false;
  if (!same(input.bridleForward, ASSESSMENT.bridleForward)) return false;
  if (!same(input.bridleLoop, ASSESSMENT.bridleLoop)) return false;
  if (!same(input.chainOnBoard, ASSESSMENT.chainOnBoard)) return false;
  if (!same(input.clearance, ASSESSMENT.clearance)) return false;
  if (!same(input.scopeTarget, ASSESSMENT.scopeTarget)) return false;
  if (input.stayStart !== ASSESSMENT.stayStart) return false;
  if (input.mooringField) return false;
  if (input.extremes.length !== ASSESSMENT.extremes.length) return false;
  return input.extremes.every(
    (point, index) =>
      point.time === ASSESSMENT.extremes[index].time && same(point.height, ASSESSMENT.extremes[index].height),
  );
}
