export type Question = {
  id: string;
  stem: string;
  choices: string[];
  answer: number;
  why: string;
};

export const QUESTIONS: Question[] = [
  {
    id: "end",
    stem: "You are committing to a mooring. The wind has already chosen which end of the boat should arrive first. Which end?",
    choices: [
      "The stern. Put the rear to the wind and back up onto the pickup.",
      "The bow, head to wind, the same way you set an anchor.",
      "The beam, so a gust lays a hull against the buoy.",
      "Whichever end is closer when you enter the bay.",
    ],
    answer: 0,
    why: "This approach is not the anchoring setup. Rear to the wind: the stern points into the wind, and you reverse onto the mooring. Head to wind is how you drop the hook, not how you come onto the buoy.",
  },
  {
    id: "off-dock",
    stem: "The wind is blowing off the pontoon, out into the fairway. You want that face. How do you come in?",
    choices: [
      "Stern toward the pontoon — that is stern to the wind — both engines in reverse, steering locked.",
      "Bow toward the pontoon in ahead, wheel free, so you can steer the last metres.",
      "Both engines in neutral and let the wind blow you off while you throw a bow line.",
      "Opposite throttles until a fender touches, then both ahead into the dock.",
    ],
    answer: 0,
    why: "Wind off the dock means the wind is coming from the pontoon. Stern to the wind points the stern at that face. Reverse with both engines. Ease them and the wind blows you back off — that is the abort. Bow-on would be head to wind.",
  },
  {
    id: "onto-dock",
    stem: "A 15–20 knot wind is blowing you onto the pontoon and you are still bow-on to that face. What does the wind change?",
    choices: [
      "Do not finish bow-first. Go round until the stern is to the wind, then reverse in on both engines with the wheel locked.",
      "Add ahead throttle so you arrive before the gust owns the bow.",
      "Leave the wheel free and correct each yaw with helm while one engine is astern.",
      "Come in beam-on and let the wind lay you on the pontoon.",
    ],
    answer: 0,
    why: "Wind onto the dock is the case the film flags on the way out: both engines ahead will drag the stern along the pontoon unless you have angle. Coming in, bow-first is downwind. The decision is still stern to the wind. If you cannot get that geometry, you are not set up.",
  },
  {
    id: "both",
    stem: "The stern is to the wind and you are on the final approach to the dock. What are the throttles doing?",
    choices: [
      "Both in reverse, revs matched, so the boat creeps stern-first without a yaw.",
      "Port ahead and starboard astern — the spin Joe uses to pivot off a fender.",
      "One engine in reverse and the other stopped, so you do not fight the wheel.",
      "Both ahead, then a hard turn as the stern reaches the dock.",
    ],
    answer: 0,
    why: "Reverse with both engines. Opposite throttles are the film’s spin: useful to pivot in a tight marina, wrong for this approach. One engine astern pulls that quarter back and twists you off the line.",
  },
  {
    id: "lock",
    stem: "Why lock the steering off before those engines go astern?",
    choices: [
      "Propeller thrust washes the rudders. Free, they twist off centre and the boat yaws even though the throttles match.",
      "A locked wheel hands the approach to the autopilot.",
      "Locking the wheel is what stops the boat alongside.",
      "Rudders do nothing in reverse, so the lock is optional.",
    ],
    answer: 0,
    why: "Lock the steering off so rudder twist from propeller thrust cannot pull you off the line. In reverse the wash hits the rudders from behind. If the wheel is free they are thrown over. Amidships and locked, only the throttles steer.",
  },
  {
    id: "yaw",
    stem: "Both throttles are matched in reverse and the stern still walks off the mooring. What do you check first?",
    choices: [
      "That the wheel is still locked. Do not add helm to fight a rudder the prop wash has already twisted.",
      "That one engine has been put ahead, because a yaw means you should be spinning.",
      "That the bow has come head to wind — if it has, keep going.",
      "Nothing. A yaw in reverse is normal and the buoy will stop it.",
    ],
    answer: 0,
    why: "Matched reverse tracks straight only while the rudders stay locked amidships. An unlocked wheel lets propeller thrust twist them, and the stern walks off. Lock it off again. Opposite engines would be a deliberate spin, not a correction.",
  },
];

export function scoreAnswers(answers: (number | null)[]): {
  correct: number;
  total: number;
  percent: number;
  complete: boolean;
} {
  const total = QUESTIONS.length;
  const complete = answers.length >= total && answers.slice(0, total).every((answer) => answer !== null);
  const correct = QUESTIONS.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
  const percent = Math.round((correct / total) * 100);
  return { correct, total, percent, complete };
}
