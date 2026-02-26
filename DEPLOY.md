# 部署到網路（讓學生可連線）

本專案建議使用 **Vercel** 部署，學生即可透過網址（例如 `https://你的專案.vercel.app`）連線測驗。

---

## 一、把程式碼放到 GitHub

1. 到 [GitHub](https://github.com/) 登入，點右上 **「+」→「New repository」**
2. 專案名稱自訂（例如 `guitar-theory-quiz`），選 **Public**，按 **Create repository**
3. 在本機專案目錄打開終端機，執行（請把 `你的帳號`、`你的專案名` 換成實際值）：

   ```bash
   cd "/Users/linzhiwei/Desktop/吉他教學APP"
   git init
   git add .
   git commit -m "Initial commit: 吉他樂理測驗"
   git branch -M main
   git remote add origin https://github.com/你的帳號/你的專案名.git
   git push -u origin main
   ```

   若已有 Git 且已設好遠端，只要 `git add .`、`git commit`、`git push` 即可。

---

## 二、在 Vercel 建立專案並部署

1. 前往 [Vercel](https://vercel.com/) 用 GitHub 登入
2. 點 **「Add New…」→「Project」**
3. 選擇剛建立的 **GitHub 專案**（例如 guitar-theory-quiz），按 **Import**
4. **Environment Variables** 區塊：新增以下六個變數（值與 `.env.local` 相同）：

   | 名稱 | 值（從 .env.local 複製） |
   |------|--------------------------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | 你的 API Key |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | guitar-be8c3.firebaseapp.com |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | guitar-be8c3 |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | guitar-be8c3.firebasestorage.app |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 587374115951 |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | 1:587374115951:web:... |

5. 按 **Deploy**，等幾分鐘完成後會得到網址，例如：  
   `https://guitar-theory-quiz-xxx.vercel.app`

---

## 三、在 Firebase 加入「授權網域」（一定要做）

部署好後，若沒做這步，**Google 登入在線上網址會失敗**。

1. 打開 [Firebase 控制台](https://console.firebase.google.com/) → 選專案 **guitar-be8c3**
2. 左側 **「Authentication」→「設定」**（或「Sign-in method」同一頁的 **Settings**）
3. 找到 **「授權網域」**（Authorized domains）
4. 點 **「新增網域」**，輸入你的 Vercel 網址的「網域」部分，例如：
   - `guitar-theory-quiz-xxx.vercel.app`  
   （不要加 `https://`，只填 xxx.vercel.app 那段）
5. 若 Vercel 有給你 **預覽網域**（例如 `xxx-git-main-xxx.vercel.app`），也可一併加入
6. 儲存後約 1 分鐘內生效

完成後，學生用瀏覽器打開你的 Vercel 網址，即可使用 Google 登入並做測驗。

---

## 讓學生在手機上「像 App 一樣」開啟（PWA）

專案已設定為 **PWA（漸進式網頁應用）**，學生用手機瀏覽器打開你的 Vercel 網址後，可以「加到主畫面」，之後從主畫面圖示點開，會以全螢幕方式執行，像 App 一樣。

**iPhone（Safari）：**  
打開網址 → 點下方「分享」→「加入主畫面」→ 命名後按「加入」。

**Android（Chrome）：**  
打開網址 → 點選單（三個點）→「安裝應用程式」或「加到主畫面」。

部署到 Vercel 後無需額外設定，學生照上述方式操作即可。

---

## 四、之後更新程式怎麼重新部署？

程式碼改完後：

```bash
git add .
git commit -m "更新說明"
git push
```

Vercel 會自動偵測 GitHub 的 push 並重新部署，不需手動操作。

---

## 五、自訂網域（選用）

若想用自己的網址（例如 `quiz.你的網域.com`）：

1. 在 Vercel 專案 **Settings → Domains** 新增網域，依畫面指示設定 DNS
2. 到 Firebase **Authentication → 授權網域** 再新增 `quiz.你的網域.com`

設定完成後，學生即可用自訂網址連線。
