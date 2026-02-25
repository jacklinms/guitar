"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-gold border-t-transparent" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-dark-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-dark-800/80 p-8 shadow-xl backdrop-blur-sm">
          <h1 className="mb-2 text-center text-2xl font-bold text-accent-gold sm:text-3xl">
            吉他樂理測驗
          </h1>
          <p className="mb-8 text-center text-zinc-400">
            請先登入以開始測驗並記錄成績
          </p>
          <Link
            href="/login"
            className="block w-full rounded-xl bg-accent-gold py-3 text-center font-semibold text-dark-900 transition hover:bg-accent-gold-light"
          >
            前往登入
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-dark-950">
      <header className="border-b border-white/10 bg-dark-900/80 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-bold text-accent-gold">吉他樂理測驗</h1>
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL ?? ""}
              alt=""
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm text-zinc-300">{user.email}</span>
            <Link
              href="/quiz"
              className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-blue-dark"
            >
              開始測驗
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-12">
        <p className="mb-8 text-center text-zinc-400">
          歡迎，{user.displayName ?? "同學"}！準備好挑戰樂理了嗎？
        </p>
        <Link
          href="/quiz"
          className="rounded-xl bg-accent-gold px-8 py-4 text-lg font-semibold text-dark-900 shadow-glow transition hover:bg-accent-gold-light hover:shadow-lg"
        >
          開始測驗
        </Link>
      </div>
    </main>
  );
}
