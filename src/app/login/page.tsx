"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading, authError, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-gold border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-dark-800/80 p-8 shadow-xl backdrop-blur-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-accent-gold sm:text-3xl">
          吉他樂理測驗
        </h1>
        <p className="mb-6 text-center text-zinc-400">
          使用 Google 帳號登入，即可開始測驗並儲存成績
        </p>
        {authError === "FIREBASE_NOT_CONFIGURED" && (
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 text-sm text-amber-200">
            <p className="font-medium">Firebase API Key 未設定或無效</p>
            <p className="mt-2 text-amber-200/90">
              請在專案根目錄建立 <code className="rounded bg-dark-700 px-1">.env.local</code>，並從 Firebase 控制台複製「專案設定」中的六個環境變數（如 <code className="rounded bg-dark-700 px-1">NEXT_PUBLIC_FIREBASE_API_KEY</code> 等）。儲存後重新執行 <code className="rounded bg-dark-700 px-1">npm run dev</code>。
            </p>
            <p className="mt-2">
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                前往 Firebase 控制台 →
              </a>
            </p>
          </div>
        )}
        {authError && authError !== "FIREBASE_NOT_CONFIGURED" && (
          <p className="mb-6 text-center text-red-400 text-sm">{authError}</p>
        )}
        <button
          type="button"
          onClick={() => signInWithGoogle()}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-dark-700 py-3.5 font-medium text-white transition hover:border-accent-gold/40 hover:bg-dark-600 hover:shadow-glow"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          使用 Google 登入
        </button>
      </div>
    </main>
  );
}
