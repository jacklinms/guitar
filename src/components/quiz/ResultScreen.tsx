"use client";

import type { QuizQuestion, QuizResultDetail } from "@/types/quiz";

interface ResultScreenProps {
  score: number;
  total: number;
  details: QuizResultDetail[];
  questions: QuizQuestion[];
  onSave: () => Promise<void>;
  saving: boolean;
}

export function ResultScreen({
  score,
  total,
  details,
  questions,
  onSave,
  saving,
}: ResultScreenProps) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <main className="min-h-screen bg-dark-950 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="card-quiz mb-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-accent-gold">測驗結果</h2>
          <p className="text-4xl font-bold text-white sm:text-5xl">
            {score} / {total}
          </p>
          <p className="mt-2 text-zinc-400">{percent}%</p>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="mt-6 w-full rounded-xl bg-accent-gold py-3 font-semibold text-dark-900 transition hover:bg-accent-gold-light disabled:opacity-50"
          >
            {saving ? "儲存中…" : "儲存成績到 Firestore"}
          </button>
        </div>
        <div className="card-quiz">
          <h3 className="mb-4 font-semibold text-zinc-200">答題明細</h3>
          <ul className="space-y-3">
            {details.map((d, i) => {
              const q = questions.find((x) => x.id === d.questionId);
              return (
                <li
                  key={d.questionId}
                  className="flex items-center justify-between rounded-lg bg-dark-700/50 px-4 py-2"
                >
                  <span className="text-zinc-300">
                    第 {i + 1} 題{q ? `：${q.question.slice(0, 20)}…` : ""}
                  </span>
                  <span
                    className={
                      d.correct ? "text-emerald-400" : "text-red-400"
                    }
                  >
                    {d.correct ? "正確" : "錯誤"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
