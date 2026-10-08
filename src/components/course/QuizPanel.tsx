import { QUESTIONS } from "@/lib/anchor/quiz";
import { ghostClass, primaryClass } from "@/components/course/ui";

type Props = {
  answers: (number | null)[];
  index: number;
  onAnswer: (choice: number) => void;
  onIndex: (index: number) => void;
  onDone: () => void;
};

export function QuizPanel({ answers, index, onAnswer, onIndex, onDone }: Props) {
  const question = QUESTIONS[index];
  const chosen = answers[index];
  const locked = chosen !== null;
  const correct = chosen === question.answer;

  return (
    <div>
      <p className="text-sm text-muted">
        Question {index + 1} of {QUESTIONS.length}
      </p>
      <h1 className="mt-2 font-serif text-3xl leading-tight">Check the decision, not the memory of a ratio</h1>
      <p className="mt-4 text-fg">{question.stem}</p>
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
                showRight ? "border-brass text-fg" : showWrong ? "border-fail text-fg" : "border-line text-fg"
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
            Score and open the record
          </button>
        ) : null}
      </div>
    </div>
  );
}
