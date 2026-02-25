import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";

const AuthProvider = dynamic(
  () => import("@/components/providers/AuthProvider").then((m) => ({ default: m.AuthProvider })),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </main>
    ),
  }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "吉他樂理測驗",
  description: "吉他樂理測驗 Web App - Google 登入與成績紀錄",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
