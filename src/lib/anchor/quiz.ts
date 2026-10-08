import { buildPlan, ASSESSMENT, metres, ratioText } from "@/lib/anchor/model";

export type Question = {
  id: string;
  stem: string;
  choices: string[];
  answer: number;
  why: string;
};

const plan = buildPlan(ASSESSMENT);
const rode = metres(plan.workingRode);
const radius = metres(plan.swingAtLow);
const horizontal = metres(plan.horizontalAtLow);
const loop = metres(ASSESSMENT.bridleLoop);
const total = metres(plan.totalVeer);

export const QUESTIONS: Question[] = [
  {
    id: "six",
    stem: "Joe Fox walks through six components of anchoring the Lagoon 42. Which set is the one in the film?",
    choices: [
      "Anchor; wind and tidal flow; how much chain you drop; setting the hook; the bridle; communication and maneuvering.",
      "Lifejacket, liferaft, EPIRB, flares, grab-bag, and a VHF check. Those are abandon-ship items, not the anchoring job.",
      "Chartplotter update, AIS alarm, radar overlay, wind instrument, depth alarm, and a satellite messenger.",
      "Sail plan, reef, traveller, vang, outhaul, and halyard tension.",
    ],
    answer: 0,
    why: "The film’s job list is the anchor itself, wind and tide, the amount of chain, setting it, the bridle, and the talk between bow and helm while you maneuver. Safety gear still matters. It is not this lesson.",
  },
  {
    id: "prep",
    stem: "What are the three prep steps before the anchor goes down?",
    choices: [
      "Stop the engine, dump the whole locker at once, and leave the helm to watch the bow.",
      "Remote out of the hatch and onto the deck; bridle and gear clear of the chain; prime the anchor over the roller with a touch of chain.",
      "Clip the bridle on in the locker, then drop anchor and bridle together.",
      "Motor astern at full throttle before the anchor is out of the roller.",
    ],
    answer: 1,
    why: "He wants the remote in hand, nothing fouling the run, and the anchor already started over the roller so it falls clean instead of hanging up.",
  },
  {
    id: "light",
    stem: "In the film, for light and benign wind, how much chain does Joe put out relative to depth?",
    choices: [
      "The same length as the boat, regardless of depth.",
      "Ten times the depth, always.",
      "Three to four times the depth.",
      "One metre of chain for every knot of wind.",
    ],
    answer: 2,
    why: "Light air in the film is 3–4× depth. This module still will not brief a 24-hour stay at 3:1, and whatever multiple you use has to be applied to roller-to-seabed at high water — not to the number you happen to see when you drop.",
  },
  {
    id: "twenty",
    stem: "He is planning for wind around 20 knots, and says be ready for up to about 25. What multiple does he use then?",
    choices: [
      "Stay at 3× if the anchor is oversized.",
      "About 5, 6, or 7 times the depth.",
      "Twice the depth, because all-chain does not need scope.",
      "Only the 5–6 m of the bridle loop.",
    ],
    answer: 1,
    why: "Around 20 knots he moves to 5–7×. The assessment anchorage uses the top of that band, 7:1, because the stay includes a night and a rising tide.",
  },
  {
    id: "counter",
    stem: "The windlass in the film has no counter and pays out 1 metre every 2 seconds. How long is 15 metres of chain?",
    choices: ["15 seconds.", "30 seconds.", "45 seconds.", "2 minutes."],
    answer: 1,
    why: "Fifteen metres at 1 metre every 2 seconds is 30 seconds. He uses that example himself. A counter is better. The clock is the backup, not a guess.",
  },
  {
    id: "which-high",
    stem: "You anchor at 16:00 and will stay 24 hours. The tide chart shows high water 1.7 m at 21:55 and 1.9 m at 09:25, and lows of 0.3 m at 03:10 and 0.4 m at 15:40. Which height sets the scope?",
    choices: [
      "1.7 m at 21:55, because it is the next high after you drop.",
      "0.3 m at 03:10, because scope should use the shallowest water.",
      "The average of the four heights.",
      "1.9 m at 09:25 — the highest water while you are actually on the hook.",
    ],
    answer: 3,
    why: "Scope is worst at the deepest moment of the stay, not at the next printed high. Tonight’s 1.7 m would leave you short when 1.9 m arrives in the morning. Low water is what sets the swing, not the scope.",
  },
  {
    id: "rode",
    stem: "Chart depth 4.0 m, bow roller 1.2 m above the water, high water of the stay 1.9 m, target 7:1. How much working rode, before the bridle loop?",
    choices: [
      "28.0 m — 7 × the 4.0 m chart depth.",
      "36.4 m — 7 × chart depth and freeboard, ignoring the tide.",
      "41.3 m — 7 × chart depth and tide, ignoring the roller.",
      "49.7 m — 7 × (4.0 + 1.9 + 1.2).",
    ],
    answer: 3,
    why: `Roller-to-seabed at high water is 7.1 m. Working rode is 7 × 7.1 = ${rode}. The 28 m figure is the mistake the film’s own 4 m example invites if you forget freeboard and the tide chart. At high water, 28 m is only ${ratioText(plan.naiveChartOnlyScope)}, not 7:1.`,
  },
  {
    id: "swing",
    stem: `Working rode is ${rode}. Low water of the stay is 0.3 m, so roller-to-seabed is 5.5 m. The bridle reaches 5.5 m forward of the bows and the Lagoon 42 is 12.8 m long. What is the low-water swing radius?`,
    choices: [
      `${rode} — the rode alone, as if the boat had no length.`,
      `${total} — working rode plus the ${loop} bridle loop.`,
      `${radius} — horizontal reach plus bridle reach plus length overall.`,
      "12.8 m — the bridle stops the boat swinging, so only the hull matters.",
    ],
    answer: 2,
    why: `Horizontal reach is √(${rode.replace(" m", "")}² − 5.5²) = ${horizontal}. Swing radius is ${horizontal} + 5.5 m of bridle + 12.8 m of boat = ${radius}. Swing ratio at that low water is ${ratioText(plan.swingRatioAtLow)}. The loop is slack chain that unloads the windlass. It is not the radius, and it is not extra scope.`,
  },
  {
    id: "decision",
    stem: `Same plan: working rode ${rode}, bridle loop ${loop}, low-water swing radius ${radius}, 80 m of chain on board. The nearest yacht sits 60 m from the anchor. What do you do?`,
    choices: [
      "Deploy. Scope is 7:1 and the chain locker can spare it.",
      "Deploy, but shorten the rode until the circle fits inside 60 m.",
      `Do not deploy. Low-water swing is ${radius} and will reach that yacht. Shortening the rode to shrink the circle gives up 7:1 at high water.`,
      "Deploy between the mooring buoys so their warps stop you swinging.",
    ],
    answer: 2,
    why: "Both gates have to pass. High-water scope can be met from the locker, and low-water swing cannot. Cutting scope to buy room is how boats drag on the top of the tide. Mooring fields are the place the film tells you to stay out of.",
  },
  {
    id: "bridle",
    stem: "When is the bridle actually doing its job?",
    choices: [
      "The hook is passed through a link so it cannot fall off, and the windlass stays tight.",
      "The hook is over one whole link, the sprung pin is home, and you have veered another 5–6 m so the chain hangs in a slack loop.",
      "The bridle is made fast to the anchor shank before you drop.",
      "You have eased the chain until it is slack on the seabed and then stopped the engines.",
    ],
    answer: 1,
    why: "A hook through the link jams when you recover. Over a whole link, pin home, then 5–6 m more chain: the apex sits forward, the load leaves the windlass, and the chain between roller and hook hangs in a loop. On this boat that moves the centre of effort about 5–6 m forward and damps the horsing. It does not shrink the swing circle to the length of the boat.",
  },
];

export function scoreAnswers(answers: (number | null)[]): { correct: number; total: number; percent: number; complete: boolean } {
  const total = QUESTIONS.length;
  const complete = answers.length >= total && answers.slice(0, total).every((answer) => answer !== null);
  const correct = QUESTIONS.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
  const percent = Math.round((correct / total) * 100);
  return { correct, total, percent, complete };
}
