export const FILM = {
  title: "Catamaran Manoeuvring Tips & Leaving a Marina",
  series: "Docking Part 1",
  maker: "TMG Yachts Australia",
  channel: "TMG Yachts",
  instructor: "Joe Fox",
  boat: "Lagoon 42",
  watch: "https://youtu.be/wagOy9IpjMY",
  embed: "https://www.youtube-nocookie.com/embed/wagOy9IpjMY",
  site: "https://tmgyachts.com/",
};

export const MASTERY = 80;

export const STEPS = [
  { id: "film", short: "Film", title: "The film" },
  { id: "wind", short: "Wind", title: "Wind decides the end" },
  { id: "astern", short: "Astern", title: "Both engines, wheel locked" },
  { id: "quiz", short: "Quiz", title: "Quiz" },
  { id: "result", short: "Result", title: "Result" },
] as const;

export function stepIndex(id: string): number {
  const index = STEPS.findIndex((step) => step.id === id);
  return index < 0 ? 0 : index;
}
