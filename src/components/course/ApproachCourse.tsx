import { useEffect, useState } from "react";
import { ghostClass, primaryClass } from "@/components/course/ui";
import { FILM, MASTERY, STEPS } from "@/lib/approach/course";
import { QUESTIONS, scoreAnswers } from "@/lib/approach/quiz";

const STORAGE_KEY = "allsail-stern-to-wind";

type Saved = {
  step: number;
  answers: (number | null)[];
  qIndex: number;
  bestScore: number | null;
};

function empty(): Saved {
  return { step: 0, answers: Array(QUESTIONS.length).fill(null), qIndex: 0, bestScore: null };
}

function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Saved>;
    const answers = Array.isArray(parsed.answers) ? parsed.answers.slice(0, QUESTIONS.length) : [];
    while (answers.length < QUESTIONS.length) answers.push(null);
    const step = typeof parsed.step === "number" ? Math.min(Math.max(0, parsed.step), STEPS.length - 1) : 0;
    const qIndex = typeof parsed.qIndex === "number" ? Math.min(Math.max(0, parsed.qIndex), QUESTIONS.length - 1) : 0;
    const bestScore = typeof parsed.bestScore === "number" ? parsed.bestScore : null;
    return { step, answers, qIndex, bestScore };
  } catch {
    return empty();
  }
}

function Rule({ index, title, children }: { index: string; title: string; children: string }) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-4">
      <span className="font-serif text-xl text-brass">{index}</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted">{children}</p>
      </div>
    </li>
  );
}

export function ApproachCourse() {
  const [state, setState] = useState<Saved>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  const score = scoreAnswers(state.answers);
  const passed = (state.bestScore ?? 0) >= MASTERY;
  const go = (step: number) => setState((current) => ({ ...current, step }));

  return (
    <>
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              aria-current={index === state.step ? "step" : undefined}
              className={`h-11 shrink-0 rounded-full px-3 text-sm ${index === state.step ? "bg-brass text-brass-ink" : "text-muted"}`}
              onClick={() => go(index)}
            >
              {step.short}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-6">
        {state.step === 0 ? <FilmLesson /> : null}
        {state.step === 1 ? <WindLesson /> : null}
        {state.step === 2 ? <AsternLesson /> : null}
        {state.step === 3 ? (
          <Quiz
            answers={state.answers}
            index={state.qIndex}
            onAnswer={(choice) => {
              if (state.answers[state.qIndex] !== null) return;
              const answers = state.answers.slice();
              answers[state.qIndex] = choice;
              const nextScore = scoreAnswers(answers);
              const sitting = nextScore.complete ? nextScore.percent : null;
              const bestScore = sitting === null ? state.bestScore : Math.max(state.bestScore ?? sitting, sitting);
              setState({ ...state, answers, bestScore });
            }}
            onIndex={(qIndex) => setState({ ...state, qIndex })}
            onDone={() => go(4)}
          />
        ) : null}
        {state.step === 4 ? (
          <Result
            percent={state.bestScore}
            complete={score.complete}
            correct={score.correct}
            passed={passed}
            missed={QUESTIONS.map((question, index) => ({ question, chosen: state.answers[index] })).filter(
              (item) => item.chosen !== null && item.chosen !== item.question.answer,
            )}
            onRetry={() =>
              setState({
                ...state,
                step: 3,
                qIndex: 0,
                answers: Array(QUESTIONS.length).fill(null),
              })
            }
            onQuiz={() => go(3)}
          />
        ) : null}
      </main>

      {state.step !== 3 ? (
        <nav className="fixed inset-x-0 bottom-0 border-t border-line bg-surface">
          <div className="mx-auto flex max-w-3xl gap-2 px-4 py-3">
            <button type="button" className={`${ghostClass} flex-1`} disabled={state.step === 0} onClick={() => go(state.step - 1)}>
              Back
            </button>
            {state.step < STEPS.length - 1 ? (
              <button type="button" className={`${primaryClass} flex-1`} onClick={() => go(state.step + 1)}>
                Continue
              </button>
            ) : (
              <button type="button" className={`${primaryClass} flex-1`} onClick={() => go(0)}>
                Replay the film
              </button>
            )}
          </div>
        </nav>
      ) : null}
    </>
  );
}

function FilmPoster() {
  const [open, setOpen] = useState(false);
  const title = "TMG’s Lagoon 42 anchoring lesson";
  return (
    <div className="overflow-hidden border border-line bg-fg">
      {open ? (
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube-nocookie.com/embed/i_SqmhP4hPU?autoplay=1"
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; compute-pressure"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex aspect-video w-full flex-col justify-between bg-fg p-5 text-left">
          <span className="text-xs tracking-widest text-brass">TMG YACHTS</span>
          <span className="font-serif text-2xl leading-tight text-bg sm:text-3xl">{title}</span>
          <span className="inline-flex h-11 w-fit items-center bg-brass px-4 text-sm font-medium text-brass-ink">Play</span>
        </button>
      )}
    </div>
  );
}

function FilmLesson() {
  return (
    <article className="space-y-5">
      <p className="font-serif text-3xl leading-tight">Stern to the wind.</p>
      <p className="text-muted">
        Follow-on from High Water Scope. Same kind of boat, next decision: the wind chooses how you approach a
        mooring or come into a dock. Credit {FILM.maker}. {FILM.instructor} on a {FILM.boat}, in {FILM.channel}’s film{" "}
        {FILM.title}.
      </p>
      <p>
        In the film he locks the wheel and forgets it. The marina is driven on the two throttles, like tracks. He also
        shows why wind changes the angle: a 15–20 knot wind blowing him onto the dock means both engines ahead will
        drag the stern down the pontoon unless he takes a proper angle off. This module is the decision on the way
        back in.
      </p>
      <ol>
        <Rule index="01" title="Rear to the wind">
          Present the stern to the wind. You back onto the mooring or the dock. You do not arrive head to wind the way
          you do when you anchor.
        </Rule>
        <Rule index="02" title="Reverse with both engines">
          Once the stern is to the wind, both throttles astern, revs matched. One ahead and one astern is a spin, not
          an approach.
        </Rule>
        <Rule index="03" title="Lock the steering off">
          Propeller thrust in reverse washes the rudders and will twist them if the wheel is free. Locked off, the
          rudders stay amidships and the throttles are the only steer.
        </Rule>
      </ol>
      <FilmPoster />
      <p className="text-sm text-muted">
        Play it in the player. AllSail embeds this film with YouTube’s player and does not download or rehost it.{" "}
        <a className="text-brass underline decoration-line underline-offset-4" href={FILM.watch}>
          Watch on YouTube
        </a>
        <span> · </span>
        <a className="text-brass underline decoration-line underline-offset-4" href={FILM.site}>
          {FILM.maker}
        </a>
      </p>
    </article>
  );
}

function WindLesson() {
  return (
    <article className="space-y-4">
      <h1 className="font-serif text-3xl leading-tight">The wind picks the end that arrives</h1>
      <p className="text-muted">
        Look at where the wind is coming from before you shape up. Stern to the wind means the stern points at the
        wind, and the last metres are astern, toward whatever you are coming onto.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-brass bg-surface p-4">
          <p className="text-sm text-muted">Wind blowing off the dock</p>
          <p className="mt-2 font-medium">Stern toward the pontoon</p>
          <p className="mt-2 text-sm text-muted">
            The wind’s source is the dock. Rear to the wind points the stern at that face. Both engines reverse you
            in. Come to neutral and the wind blows you back off. That abort only exists if you came in this way.
          </p>
        </div>
        <div className="rounded-md border border-line bg-surface p-4">
          <p className="text-sm text-muted">Wind blowing you onto the dock</p>
          <p className="mt-2 font-medium">Do not finish bow-first</p>
          <p className="mt-2 text-sm text-muted">
            Bow-on is downwind. The stern is not to the wind, and both engines ahead is how the film’s stern gets
            dragged along the pontoon. Go round. Only reverse in once the stern is to the wind. If you cannot get
            that geometry, you are not set up.
          </p>
        </div>
      </div>
      <div className="rounded-md border border-line bg-surface-2 p-4">
        <p className="text-sm text-muted">Mooring buoy</p>
        <p className="mt-2 text-sm">
          The pickup is upwind of you. Stern points at the buoy and at the wind. Back up to it. Do not approach head
          to wind and then try to turn the stern in at the last moment — that is when the bows’ windage takes the
          boat off the line you chose.
        </p>
      </div>
      <p className="text-sm text-muted">
        Anchoring in the previous module is the other end of the boat: head to wind, chain going out, bridle after the
        hook is set. Do not reuse that picture for a mooring or a dock.
      </p>
    </article>
  );
}

function AsternLesson() {
  return (
    <article className="space-y-4">
      <h1 className="font-serif text-3xl leading-tight">Both astern. Wheel locked.</h1>
      <p className="text-muted">
        {FILM.instructor} locks the wheel on the {FILM.boat} so the helm drops out of the problem. On the way in, that
        lock does a second job: it stops propeller thrust from twisting the rudders.
      </p>
      <ol>
        <Rule index="01" title="Match the revs">
          Both engines in reverse, same revs. The hulls are far apart. Unequal astern pulls one quarter back and the
          stern walks off the mooring or down the dock.
        </Rule>
        <Rule index="02" title="Do not borrow the spin">
          Port ahead and starboard astern, revs matched, is how he pivots on a stern fender and how he turns in a
          tight fairway. That pair of throttles is a turn. The approach is both astern.
        </Rule>
        <Rule index="03" title="Lock steering off before you go astern">
          Reverse wash travels forward onto the rudders. A free wheel gets thrown hard over. The boat yaws while the
          throttles still look even. Lock the wheel amidships first, then the throttles.
        </Rule>
        <Rule index="04" title="A yaw is a check, not more helm">
          If the stern walks off with the throttles matched, look at the wheel before you touch it. Unlocking it to
          “correct” feeds the twist. Lock it off, rematch the revs, and if the line is gone, go round rather than
          powering out of it alongside.
        </Rule>
      </ol>
    </article>
  );
}

function Quiz({
  answers,
  index,
  onAnswer,
  onIndex,
  onDone,
}: {
  answers: (number | null)[];
  index: number;
  onAnswer: (choice: number) => void;
  onIndex: (index: number) => void;
  onDone: () => void;
}) {
  const question = QUESTIONS[index];
  const chosen = answers[index];
  const locked = chosen !== null;
  const correct = chosen === question.answer;

  return (
    <div>
      <p className="text-sm text-muted">
        Question {index + 1} of {QUESTIONS.length}
      </p>
      <h1 className="mt-2 font-serif text-3xl leading-tight">Wind first. Then the throttles.</h1>
      <p className="mt-4">{question.stem}</p>
      <div role="radiogroup" aria-label={`Question ${index + 1}`} className="mt-4 space-y-2">
        {question.choices.map((choice, choiceIndex) => {
          const selected = chosen === choiceIndex;
          const showRight = locked && choiceIndex === question.answer;
          const showWrong = locked && selected && !correct;
          return (
            <button
              key={choice}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={locked}
              onClick={() => onAnswer(choiceIndex)}
              className={`block min-h-11 w-full rounded-md border px-3 py-3 text-left text-sm disabled:opacity-100 ${
                showRight ? "border-brass" : showWrong ? "border-fail" : "border-line"
              }`}
            >
              <span className="mr-2 text-muted">{String.fromCharCode(65 + choiceIndex)}</span>
              {choice}
              {showRight ? <span className="mt-2 block text-xs text-brass">This is the safe answer</span> : null}
              {showWrong ? <span className="mt-2 block text-xs text-fail">Not this one</span> : null}
            </button>
          );
        })}
      </div>
      {locked ? <p className="mt-4 text-sm text-muted">{question.why}</p> : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className={ghostClass} disabled={index === 0} onClick={() => onIndex(index - 1)}>
          Previous
        </button>
        {locked && index < QUESTIONS.length - 1 ? (
          <button type="button" className={primaryClass} onClick={() => onIndex(index + 1)}>
            Next question
          </button>
        ) : null}
        {locked && index === QUESTIONS.length - 1 ? (
          <button type="button" className={primaryClass} onClick={onDone}>
            Score
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Result({
  percent,
  complete,
  correct,
  passed,
  missed,
  onRetry,
  onQuiz,
}: {
  percent: number | null;
  complete: boolean;
  correct: number;
  passed: boolean;
  missed: { question: (typeof QUESTIONS)[number]; chosen: number | null }[];
  onRetry: () => void;
  onQuiz: () => void;
}) {
  return (
    <article className="space-y-5">
      <h1 className="font-serif text-3xl leading-tight">{passed ? "Approach passed" : "Not passed yet"}</h1>
      <p className="text-muted">
        A pass is {MASTERY}% on the six wind decisions. The rule is the same in every stem: stern to the wind, both
        engines in reverse, steering locked off.
      </p>
      <div className="rounded-md border border-line bg-surface p-4">
        <p className="text-xs text-muted">Best score</p>
        <p className="mt-1 font-serif text-2xl">{complete && percent !== null ? `${percent}%` : "Not scored"}</p>
        <p className="mt-2 text-xs text-muted">
          {complete ? `${correct} of ${QUESTIONS.length} on the latest sitting` : "Answer all six"}
        </p>
      </div>
      {!complete || (percent !== null && percent < MASTERY) ? (
        <button type="button" className={ghostClass} onClick={complete ? onRetry : onQuiz}>
          {complete ? "Retry the quiz" : "Open the quiz"}
        </button>
      ) : null}
      {missed.length > 0 ? (
        <div>
          <p className="text-sm">Missed</p>
          <ul className="mt-2 space-y-3">
            {missed.map((item) => (
              <li key={item.question.id} className="rounded-md border border-line p-3 text-sm">
                <p>{item.question.stem}</p>
                <p className="mt-2 text-muted">{item.question.why}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="text-xs text-muted">
        Film credited to {FILM.maker}. {FILM.instructor}, {FILM.boat}. {FILM.series}. The picture stays on YouTube.
      </p>
    </article>
  );
}
