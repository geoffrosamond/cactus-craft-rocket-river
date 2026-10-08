import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tides")({
  server: {
    handlers: {
      GET: async () => {
        const { loadPittwaterTides } = await import("@/lib/tides/willy.server");
        const body = await loadPittwaterTides();
        return Response.json(body);
      },
    },
  },
});
