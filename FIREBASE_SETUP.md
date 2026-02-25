# Firebase 控制台設定指南

本專案使用 Firebase 的 **Authentication（Google 登入）** 與 **Firestore（成績儲存）**。請依下列步驟在 Firebase 控制台建立專案並取得 API Key。

---

## 一、建立 Firebase 專案

1. 前往 [Firebase 控制台](https://console.firebase.google.com/)
2. 點擊 **「新增專案」**（或「建立專案」）
3. 輸入專案名稱（例如：`guitar-theory-quiz`），按「繼續」
4. 若有 Google Analytics，可選擇啟用或停用，再按「建立專案」
5. 專案建立完成後，點擊「繼續」進入專案

---

## 二、註冊 Web 應用程式並取得設定

1. 在專案總覽頁，點擊 **「</>」**（網頁圖示）新增 Web 應用程式
2. 輸入 App 暱稱（例如：`Guitar Quiz Web`），可勾選「也設定 Firebase Hosting」（本專案部署在 Vercel 可先不勾）
3. 點擊「註冊應用程式」
4. 畫面上會顯示 **firebaseConfig** 物件，例如：

   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc..."
   };
   ```

5. **請把這六個欄位的值記下來**，待會要寫入 `.env.local`

---

## 三、啟用 Google 登入（Authentication）

1. 左側選單點 **「建置」→「Authentication」**
2. 點「開始使用」
3. 在「登入方法」分頁，點「Google」
4. 將 **「啟用」** 開關打開
5. 設定「專案支援電子郵件」（選你的 Gmail）
6. 按「儲存」

---

## 四、建立 Firestore 資料庫

1. 左側選單點 **「建置」→「Firestore Database」**
2. 點「建立資料庫」
3. 選擇 **「在正式環境中開始」**（之後可在規則中限制僅登入者可寫入）
4. 選擇 Firestore 位置（例如：`asia-east1` 台灣），按「啟用」
5. 資料庫建立後，到 **「規則」** 分頁，建議先設為（僅登入使用者可讀寫 `quizScores`）：

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /quizScores/{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

   按「發佈」

---

## 五、在本機設定環境變數

1. 在專案根目錄複製範例檔：

   ```bash
   cp .env.example .env.local
   ```

2. 用編輯器打開 `.env.local`，填入 Firebase 的六個值：

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=你的_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=你的專案_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=你的專案_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=你的專案_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=你的_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=你的_app_id
   ```

3. 存檔後重新啟動開發伺服器（`npm run dev`）

---

## 六、Vercel 部署時設定

若部署到 Vercel：

1. 在 Vercel 專案中進入 **Settings → Environment Variables**
2. 將上述六個變數逐一新增，名稱與 `.env.local` 相同（`NEXT_PUBLIC_FIREBASE_...`）
3. 重新部署後，前端的 Firebase 設定即會生效

---

## 七、確認 Auth 授權網域（若部署到自訂網域）

若你使用 Vercel 提供的網域（例如 `xxx.vercel.app`）：

- Firebase Auth 預設會允許 `localhost` 以及 `*.firebaseapp.com`
- 使用 Vercel 網域時，請到 **Authentication → 設定 → 授權網域**，新增你的 Vercel 網域（例如 `your-app.vercel.app`），否則 Google 登入在該網域會無法使用

完成以上步驟後，即可在本機與 Vercel 上使用 Google 登入並將成績寫入 Firestore。
