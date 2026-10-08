export type TideExtreme = { time: string; height: number };

export type TideFeed =
  | { ok: true; location: string; extremes: TideExtreme[]; issued: string }
  | { ok: false; error: string };

const TIDE_TYPES = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19]);

export type WillyLocation = { id: number; name: string; typeId?: number };

export function choosePittwater(locations: WillyLocation[]): WillyLocation | null {
  const tidal = locations.filter((location) => location.typeId === undefined || TIDE_TYPES.has(location.typeId));
  const ranked = [...tidal].sort((a, b) => score(b.name) - score(a.name));
  return ranked[0] ?? null;
}

function score(name: string): number {
  const text = name.toLowerCase();
  if (text.includes("church point")) return 5;
  if (text.includes("towlers")) return 4;
  if (text === "pittwater") return 3;
  if (text.includes("pittwater") && !text.includes("entrance")) return 2;
  if (text.includes("pittwater")) return 1;
  return 0;
}

type Entry = { dateTime?: string; height?: number; type?: string };

export function extremesFromForecast(body: unknown): { location: string; extremes: TideExtreme[]; issued: string } | null {
  if (!body || typeof body !== "object") return null;
  const root = body as {
    location?: { name?: string };
    forecasts?: { tides?: { days?: { entries?: Entry[] }[]; units?: { height?: string }; issueDateTime?: string } };
  };
  const tides = root.forecasts?.tides;
  if (!tides?.days) return null;
  const feet = String(tides.units?.height ?? "m").toLowerCase() === "ft";
  const extremes: TideExtreme[] = [];
  for (const day of tides.days) {
    for (const entry of day.entries ?? []) {
      const stamp = String(entry.dateTime ?? "");
      const match = /(\d{2}):(\d{2})/.exec(stamp);
      const height = Number(entry.height);
      if (!match || !Number.isFinite(height)) continue;
      const metres = feet ? height * 0.3048 : height;
      extremes.push({ time: `${match[1]}:${match[2]}`, height: Math.round(metres * 100) / 100 });
    }
  }
  if (extremes.length < 2) return null;
  return {
    location: root.location?.name || "Pittwater",
    extremes,
    issued: String(tides.issueDateTime ?? ""),
  };
}
