"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import quizData from "@/data/quiz-questions.json";
import type { QuizQuestion, QuizResultDetail } from "@/types/quiz";
import { saveQuizScore } from "@/lib/firestore";
import { QuizCard } from "@/components/quiz/QuizCard";
import { ResultScreen } from "@/components/quiz/ResultScreen";

const questions = quizData as QuizQuestion[];

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [details, setDetails] = useState<QuizResultDetail[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (optionId: string) => {
    if (answered) return;
    setSelectedId(optionId);
    setAnswered(true);
    const correct = optionId === current.correctAnswer;
    setDetails((prev) => [
      ...prev,
      { questionId: current.id, correct, selectedAnswer: optionId },
    ]);
  };

  const handleNext = () => {
    if (!answered) return;
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswered(false);
    setSelectedId(null);
  };

  const handleSaveAndFinish = async () => {
    if (!user?.email) return;
    setSaving(true);
    const score = details.filter((d) => d.correct).length;
    await saveQuizScore({
      studentEmail: user.email,
      score,
      timestamp: new Date(),
      details,
    });
    setSaving(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-gold border-t-transparent" />
      </main>
    );
  }

  if (!user) return null;

  if (finished) {
    const score = details.filter((d) => d.correct).length;
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        details={details}
        questions={questions}
        onSave={handleSaveAndFinish}
        saving={saving}
      />
    );
  }

  return (
    <main className="min-h-screen bg-dark-950 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← 返回
          </button>
          <span className="text-sm text-zinc-400">
            第 {currentIndex + 1} / {questions.length} 題
          </span>
        </div>
        <QuizCard
          question={current}
          selectedId={selectedId}
          answered={answered}
          isLast={isLast}
          onSelect={handleSelect}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}
