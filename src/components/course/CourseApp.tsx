import { useEffect, useRef, useState } from "react";
import { ApproachCourse } from "@/components/course/ApproachCourse";
import { Calculator } from "@/components/course/Calculator";
import { BridleLesson, BriefLesson, ScopeLesson, SixLesson, SwingLesson } from "@/components/course/lessons";
import { QuizPanel } from "@/components/course/QuizPanel";
import { ghostClass, primaryClass } from "@/components/course/ui";
import { MASTERY, STEPS, stepIndex } from "@/lib/anchor/course";
import { ASSESSMENT, clonePlan, type PlanInput } from "@/lib/anchor/model";
import { QUESTIONS, scoreAnswers } from "@/lib/anchor/quiz";
import { openScorm, readSuspend, type ScormHandle } from "@/lib/anchor/scorm";

type CourseState = {
  step: number;
  answers: (number | null)[];
  qIndex: number;
  deployCleared: boolean;
  bestScore: number | null;
};

const ZIP = "/downloads/high-water-scope-scorm12.zip";

export function CourseApp() {
  const scormRef = useRef<ScormHandle | null>(null);
  const dirty = useRef(false);
  const stateRef = useRef<CourseState | null>(null);
  const [module, setModule] = useState<"scope" | "approach">("approach");
  const [mode, setMode] = useState<"lms" | "preview">("preview");
  const [tick, setTick] = useState(0);
  const [plan, setPlan] = useState<PlanInput>(() => clonePlan(ASSESSMENT));
  const [state, setState] = useState<CourseState>({
    step: 0,
    answers: Array(QUESTIONS.length).fill(null),
    qIndex: 0,
    deployCleared: false,
    bestScore: null,
  });

  stateRef.current = state;

  const commit = (scorm: ScormHandle, next: CourseState) => {
    const score = scoreAnswers(next.answers);
    const sitting = score.complete ? score.percent : null;
    const best = sitting === null ? next.bestScore : Math.max(next.bestScore ?? sitting, sitting);
    const stored: CourseState = { ...next, bestScore: best };
    const lesson =
      best !== null && best >= MASTERY && stored.deployCleared
        ? "passed"
        : sitting !== null && sitting < MASTERY
          ? "failed"
          : "incomplete";
    scorm.setValue("cmi.core.lesson_location", STEPS[stored.step].id);
    scorm.setValue(
      "cmi.suspend_data",
      JSON.stringify({
        step: stored.step,
        answers: stored.answers,
        deployCleared: stored.deployCleared,
        bestScore: stored.bestScore,
      }),
    );
    scorm.setValue("cmi.core.exit", "suspend");
    if (best !== null) {
      scorm.setValue("cmi.core.score.raw", String(best));
      scorm.setValue("cmi.core.score.min", "0");
      scorm.setValue("cmi.core.score.max", "100");
    }
    scorm.setValue("cmi.core.lesson_status", lesson);
    scorm.commit();
    return stored;
  };

  useEffect(() => {
    const scorm = openScorm();
    scormRef.current = scorm;
    if (dirty.current && stateRef.current) {
      commit(scorm, stateRef.current);
    } else {
      const suspend = readSuspend(scorm.getValue("cmi.suspend_data"), QUESTIONS.length);
      const location = scorm.getValue("cmi.core.lesson_location");
      const unfinished = suspend.answers.findIndex((answer) => answer === null);
      const rawScore = Number(scorm.getValue("cmi.core.score.raw"));
      const bestFromLms = Number.isFinite(rawScore) && scorm.getValue("cmi.core.score.raw") !== "" ? rawScore : null;
      setState({
        step: location ? stepIndex(location) : suspend.step,
        answers: suspend.answers,
        qIndex: unfinished < 0 ? QUESTIONS.length - 1 : unfinished,
        deployCleared: suspend.deployCleared,
        bestScore: suspend.bestScore ?? bestFromLms,
      });
    }
    setMode(scorm.mode);
    setTick((value) => value + 1);
    const onHide = () => scorm.finish();
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  const write = (next: CourseState) => {
    dirty.current = true;
    const scorm = scormRef.current;
    const stored = scorm ? commit(scorm, next) : next;
    setState(stored);
    if (scorm) setTick((value) => value + 1);
  };

  const go = (step: number) => write({ ...state, step });

  const score = scoreAnswers(state.answers);
  const passed = (state.bestScore ?? 0) >= MASTERY && state.deployCleared;
  const rows = scormRef.current?.rows() ?? [];
  const log = scormRef.current?.log ?? [];
  void tick;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="font-serif text-2xl leading-none tracking-tight">
              <span>ALL</span>
              <span className="text-brass">SAIL</span>
            </p>
            <p className="mt-1 text-xs tracking-widest text-muted">PITTWATER · CHURCH POINT</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="hidden text-xs tracking-widest text-muted sm:block">YACHT & CATAMARAN CHARTERS</p>
            {module === "scope" ? (
              <span className={`rounded-full border px-3 py-2 text-xs ${passed ? "border-brass text-brass" : "border-line text-muted"}`}>
                {passed ? "Passed" : state.bestScore !== null && score.complete && state.bestScore < MASTERY ? "Failed" : "In progress"}
              </span>
            ) : (
              <span className="rounded-full border border-line px-3 py-2 text-xs text-muted">Follow-on</span>
            )}
          </div>
        </div>
        <div className="mx-auto flex max-w-3xl gap-2 px-4 pb-2">
          <button
            type="button"
            aria-pressed={module === "scope"}
            className={`h-11 rounded-full px-3 text-sm ${module === "scope" ? "bg-brass text-brass-ink" : "text-muted"}`}
            onClick={() => setModule("scope")}
          >
            Scope
          </button>
          <button
            type="button"
            aria-pressed={module === "approach"}
            className={`h-11 rounded-full px-3 text-sm ${module === "approach" ? "bg-brass text-brass-ink" : "text-muted"}`}
            onClick={() => setModule("approach")}
          >
            Approach
          </button>
        </div>
        {module === "scope" ? (
          <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pb-3">
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
        ) : null}
      </header>

      <figure className="mx-auto max-w-3xl px-4 pt-4">
        <img
          src="/brand/impulso.jpg"
          alt="Impulso, the AllSail Lagoon 39, on Pittwater"
          className="w-full border border-line"
        />
        <figcaption className="mt-2 text-xs tracking-widest text-muted">IMPULSO · LAGOON 39 · PITTWATER</figcaption>
      </figure>

      {module === "approach" ? (
        <ApproachCourse />
      ) : (
      <>
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-6">
        {state.step === 0 ? <BriefLesson /> : null}
        {state.step === 1 ? <SixLesson /> : null}
        {state.step === 2 ? <ScopeLesson /> : null}
        {state.step === 3 ? <SwingLesson /> : null}
        {state.step === 4 ? (
          <Calculator
            value={plan}
            onChange={setPlan}
            recorded={state.deployCleared}
            onRecord={() => write({ ...state, deployCleared: true })}
          />
        ) : null}
        {state.step === 5 ? <BridleLesson /> : null}
        {state.step === 6 ? (
          <QuizPanel
            answers={state.answers}
            index={state.qIndex}
            onAnswer={(choice) => {
              if (state.answers[state.qIndex] !== null) return;
              const answers = state.answers.slice();
              answers[state.qIndex] = choice;
              write({ ...state, answers });
            }}
            onIndex={(qIndex) => write({ ...state, qIndex })}
            onDone={() => write({ ...state, step: 7 })}
          />
        ) : null}
        {state.step === 7 ? (
          <Record
            percent={state.bestScore}
            complete={score.complete}
            correct={score.correct}
            deployCleared={state.deployCleared}
            passed={passed}
            mode={mode}
            rows={rows}
            log={log}
            missed={QUESTIONS.map((question, index) => ({ question, chosen: state.answers[index] })).filter(
              (item) => item.chosen !== null && item.chosen !== item.question.answer,
            )}
            onReset={() =>
              write({
                step: 0,
                answers: Array(QUESTIONS.length).fill(null),
                qIndex: 0,
                deployCleared: false,
                bestScore: null,
              })
            }
            onRetry={() =>
              write({
                ...state,
                step: 6,
                qIndex: 0,
                answers: Array(QUESTIONS.length).fill(null),
              })
            }
            onQuiz={() => go(6)}
            onChart={() => go(4)}
          />
        ) : null}
      </main>

      {state.step !== 6 ? (
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
              <a className={`${primaryClass} flex-1`} href={ZIP} download="high-water-scope-scorm12.zip">
                Download package
              </a>
            )}
          </div>
        </nav>
      ) : null}
      </>
      )}
    </div>
  );
}

function Record({
  percent,
  complete,
  correct,
  deployCleared,
  passed,
  mode,
  rows,
  log,
  missed,
  onReset,
  onRetry,
  onQuiz,
  onChart,
}: {
  percent: number | null;
  complete: boolean;
  correct: number;
  deployCleared: boolean;
  passed: boolean;
  mode: "lms" | "preview";
  rows: { key: string; value: string }[];
  log: { call: string; detail: string }[];
  missed: { question: (typeof QUESTIONS)[number]; chosen: number | null }[];
  onReset: () => void;
  onRetry: () => void;
  onQuiz: () => void;
  onChart: () => void;
}) {
  return (
    <article className="space-y-5">
      <h1 className="font-serif text-3xl leading-tight">{passed ? "Recorded as passed" : "Not passed yet"}</h1>
      <p className="text-muted">
        A pass is {MASTERY}% on the ten questions and a cleared deployment on the assessment anchorage. Both are
        written to the SCORM 1.2 data model: score, lesson status, bookmark, and suspend data.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-line bg-surface p-3">
          <p className="text-xs text-muted">Quiz</p>
          <p className="mt-1 font-serif text-2xl">{complete && percent !== null ? `${percent}%` : "Not scored"}</p>
          <p className="mt-2 text-xs text-muted">{complete ? `${correct} of ${QUESTIONS.length} on the latest sitting` : "Answer all ten"}</p>
        </div>
        <div className="rounded-md border border-line bg-surface p-3">
          <p className="text-xs text-muted">24-hour deployment</p>
          <p className={`mt-1 font-serif text-2xl ${deployCleared ? "text-brass" : "text-fail"}`}>{deployCleared ? "Cleared" : "Not recorded"}</p>
          <p className="mt-2 text-xs text-muted">Scope at high water, swing at low water</p>
        </div>
      </div>
      {!deployCleared ? (
        <button type="button" className={ghostClass} onClick={onChart}>
          Open the tide chart
        </button>
      ) : null}
      {!complete || (percent !== null && percent < MASTERY) ? (
        <button type="button" className={`${ghostClass} ml-2`} onClick={complete ? onRetry : onQuiz}>
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
      <p className="text-sm text-muted">
        {mode === "lms"
          ? "This attempt is talking to an LMS SCORM API in the parent window."
          : "No LMS API was found above this page, so a local SCORM 1.2 shim is storing the attempt. Import the zip into an LMS and the same calls go to the real API."}
      </p>
      <div className="overflow-x-auto rounded-md border border-line">
        <table className="w-full text-left text-xs">
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-line align-top last:border-0">
                <th className="px-3 py-2 font-medium text-muted">{row.key}</th>
                <td className="px-3 py-2 break-all">{row.value || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-1 text-xs text-muted">
        {log.map((entry, index) => (
          <li key={`${entry.call}-${index}`}>
            {entry.call}: {entry.detail}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <a className={primaryClass} href={ZIP} download="high-water-scope-scorm12.zip">
          Download SCORM 1.2 zip
        </a>
        <button type="button" className={ghostClass} onClick={onReset}>
          Reset this attempt
        </button>
      </div>
      <p className="text-xs text-muted">
        Import the zip as a package. The manifest is at the root. Do not upload a folder unless the LMS asks for
        imsmanifest.xml itself. Package id: com.highwaterscope.catamaran-anchor.12. Mastery score 80.
      </p>
    </article>
  );
}
