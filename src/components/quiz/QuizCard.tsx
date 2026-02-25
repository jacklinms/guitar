"use client";

import type { QuizQuestion } from "@/types/quiz";

interface QuizCardProps {
  question: QuizQuestion;
  selectedId: string | null;
  answered: boolean;
  isLast: boolean;
  onSelect: (optionId: string) => void;
  onNext: () => void;
}

export function QuizCard({
  question,
  selectedId,
  answered,
  isLast,
  onSelect,
  onNext,
}: QuizCardProps) {

  const getOptionClass = (optionId: string) => {
    const base = "btn-quiz w-full text-left";
    if (!answered) return base;
    if (optionId === question.correctAnswer) return `${base} correct`;
    if (optionId === selectedId) return `${base} wrong`;
    return `${base} opacity-60`;
  };

  return (
    <div className="card-quiz">
      <p className="mb-6 text-lg font-medium leading-relaxed text-zinc-100 sm:text-xl">
        {question.question}
      </p>
      <div className="space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            disabled={answered}
            className={getOptionClass(opt.id)}
          >
            <span className="mr-2 font-semibold text-accent-gold">{opt.id}.</span>
            {opt.text}
          </button>
        ))}
      </div>
      {answered && (
        <div className="mt-8 rounded-xl border border-white/10 bg-dark-900/60 p-4">
          <p className="mb-1 text-sm font-medium text-accent-gold">解析</p>
          <p className="text-sm leading-relaxed text-zinc-300">
            {question.explanation}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="mt-4 w-full rounded-xl bg-accent-blue py-3 font-semibold text-white transition hover:bg-accent-blue-dark"
          >
            {isLast ? "查看成績" : "下一題"}
          </button>
        </div>
      )}
    </div>
  );
}
