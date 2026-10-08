import { choosePittwater, extremesFromForecast, type TideFeed, type WillyLocation } from "./willy";

const BASE = "https://api.willyweather.com.au/v2";

function sydneyDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function asLocations(body: unknown): WillyLocation[] {
  const list = Array.isArray(body)
    ? body
    : body && typeof body === "object" && Array.isArray((body as { locations?: unknown }).locations)
      ? (body as { locations: unknown[] }).locations
      : [];
  return list.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as { id?: number; name?: string; typeId?: number };
    if (!row.id || !row.name) return [];
    return [{ id: row.id, name: row.name, typeId: row.typeId }];
  });
}

export async function loadPittwaterTides(): Promise<TideFeed> {
  const key = process.env.WILLYWEATHER_API_KEY?.trim();
  if (!key) {
    return {
      ok: false,
      error: "WillyWeather needs an API key on the server before today’s Pittwater tides can load.",
    };
  }
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-payload": JSON.stringify({ query: "Pittwater", limit: 10 }),
  };
  let search: Response;
  try {
    search = await fetch(`${BASE}/${encodeURIComponent(key)}/search.json?query=${encodeURIComponent("Pittwater")}&limit=10`, {
      headers,
    });
  } catch {
    return { ok: false, error: "WillyWeather did not answer." };
  }
  if (search.status === 401 || search.status === 403) {
    return { ok: false, error: "WillyWeather refused the API key." };
  }
  if (!search.ok) return { ok: false, error: "WillyWeather could not find Pittwater." };
  const place = choosePittwater(asLocations(await readJson(search)));
  if (!place) return { ok: false, error: "WillyWeather has no Pittwater tide station on this key." };

  const startDate = sydneyDate();
  let forecast: Response;
  try {
    forecast = await fetch(
      `${BASE}/${encodeURIComponent(key)}/locations/${place.id}/weather.json?units=tideHeight:m`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-payload": JSON.stringify({ forecasts: ["tides"], days: 2, startDate }),
        },
      },
    );
  } catch {
    return { ok: false, error: "WillyWeather did not answer." };
  }
  if (!forecast.ok) return { ok: false, error: "WillyWeather did not return a tide chart." };
  const parsed = extremesFromForecast(await readJson(forecast));
  if (!parsed) return { ok: false, error: "WillyWeather returned no highs or lows." };
  return { ok: true, ...parsed };
}
