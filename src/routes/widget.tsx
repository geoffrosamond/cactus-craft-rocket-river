import { createFileRoute } from "@tanstack/react-router";
import { ChainWidget } from "@/components/widget/ChainWidget";

export const Route = createFileRoute("/widget")({
  component: WidgetPage,
});

function WidgetPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-xl border-x border-line">
        <ChainWidget framed />
      </div>
    </main>
  );
}
