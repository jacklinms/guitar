# 吉他樂理測驗 Web App

具備 Google 登入與成績紀錄的吉他樂理測驗，採用 Next.js (App Router)、Tailwind CSS、Firebase (Auth + Firestore)，可部署於 Vercel。

## 功能

- **Google 登入**：未登入僅顯示登入頁，登入後顯示 Email 與頭像
- **一頁一題測驗**：從 JSON 讀取題目，卡片式介面、即時對錯與解析、「下一題」按鈕
- **成績紀錄**：測驗結束後計算總分，並將 `studentEmail`、`score`、`timestamp`、`details` 存入 Firestore

## 技術棧

- Next.js 14 (App Router)、TypeScript、Tailwind CSS
- Firebase Authentication (Google)、Firestore

## 開始使用

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定 Firebase

請依照專案中的 **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** 在 Firebase 控制台建立專案、啟用 Google 登入與 Firestore，並取得設定值。

### 3. 環境變數

複製 `.env.example` 為 `.env.local`，填入 Firebase 的六個環境變數。

### 4. 啟動開發伺服器

```bash
npm run dev
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。

## 專案結構（精簡）

- `src/app/`：首頁、登入頁、測驗頁
- `src/components/`：AuthProvider、QuizCard、ResultScreen
- `src/data/quiz-questions.json`：測驗題目
- `src/lib/`：Firebase 初始化、Firestore 寫入
- `src/types/quiz.ts`：題型與成績型別

## 部署到 Vercel

1. 將專案推送到 GitHub，在 Vercel 匯入專案
2. 在 Vercel 的 Environment Variables 中加入與 `.env.local` 相同的六個 Firebase 變數
3. 在 Firebase 控制台 **Authentication → 授權網域** 新增你的 Vercel 網域

完成後即可使用 Google 登入與成績儲存。
