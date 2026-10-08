import { createServerFn } from "@tanstack/react-start";
import type { TideFeed } from "./willy";

export const getPittwaterTides = createServerFn({ method: "GET" }).handler(async (): Promise<TideFeed> => {
  const { loadPittwaterTides } = await import("./willy.server");
  return loadPittwaterTides();
});
