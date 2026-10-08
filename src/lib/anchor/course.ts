export const FILM = {
  title: "How to Anchor and Set Up a Bridle on a Catamaran",
  maker: "TMG Yachts",
  instructor: "Joe Fox",
  boat: "Lagoon 42",
  url: "https://youtu.be/i_SqmhP4hPU",
  blog: "https://www.themultihullgroup.com/inspire-and-learn-how-to-anchor-and-set-up-bridle/",
};

export const MASTERY = 80;

export const STEPS = [
  { id: "brief", short: "Brief", title: "Safety brief" },
  { id: "six", short: "Six", title: "Six components" },
  { id: "scope", short: "Scope", title: "High-water scope" },
  { id: "swing", short: "Swing", title: "Low-water swing" },
  { id: "chart", short: "Chart", title: "24-hour tide chart" },
  { id: "bridle", short: "Bridle", title: "Set and bridle" },
  { id: "quiz", short: "Quiz", title: "Quiz" },
  { id: "record", short: "Record", title: "SCORM record" },
] as const;

export function stepIndex(id: string): number {
  const index = STEPS.findIndex((step) => step.id === id);
  return index < 0 ? 0 : index;
}
