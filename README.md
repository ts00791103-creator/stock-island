# 股票島 Stock Island V1.0

React + Three.js + FastAPI 的繁體中文股票分析網站。**獨立新專案，不會更動既有 adam-stock-mirror。**

## 已完成
- 3D 互動島嶼：拖曳旋轉、滑鼠滾輪與手機雙指縮放、點擊島嶼進入功能
- 股票代號/內建常用股票名稱搜尋
- 臺灣證交所 TWSE 歷史日K查詢（無資料時明顯標示 DEMO 示範資料）
- 紅漲綠跌 K 線、MA5/MA20、布林通道（20, 2）
- 亞當鏡像示範：可設定波段起終點，時間倒序後按起點平移
- 響應式繁體中文介面

## 重要限制
1. **目前尚未移植舊版 adam-stock-mirror 演算法**：本版是獨立可運作的鏡像原型。若要完全沿用舊版，需核對舊庫的實際程式與測試案例。
2. 第一版僅支援歷史**日K**；分鐘K、週K、月K及即時行情尚未實作。TWSE 不一定涵蓋上櫃股票及所有 ETF。
3. TWSE 查詢可能被限流或服務中斷；回退 DEMO 資料並非行情，絕不能用來交易。
4. 亞當鏡像是情境推演，**非股價預測**。本版未進行勝率回測。
5. 不提供使用者帳號、資料儲存或正式通知推播。

## 電腦本機啟動
需安裝 Node.js 20.19+（或 22.12+）與 Python 3.10+。

終端機 A：
```bash
cd backend
python -m venv .venv
# macOS/Linux: source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
終端機 B：
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```
瀏覽器開啟 http://localhost:5173 ，後端文件 http://localhost:8000/docs 。

## GitHub 新專案（不影響舊版）
1. 在 GitHub 建立 **stock-island** 空白 repository（不要選擇既有 adam-stock-mirror）。
2. 解壓縮本專案，把所有檔案上傳到新 repository。電腦可用：
```bash
git init
git add .
git commit -m "股票島 V1.0 初版"
git branch -M main
git remote add origin https://github.com/你的帳號/stock-island.git
git push -u origin main
```
3. 手機可用 GitHub 網頁逐檔上傳，但大量檔案建議在電腦使用 GitHub Desktop。

## 部署後端：Render
1. Render → New → Web Service → 連結 `stock-island` repository。
2. Root Directory 設 `backend`；Build Command `pip install -r requirements.txt`；Start Command `uvicorn main:app --host 0.0.0.0 --port $PORT`。
3. 部署完成後取得 `https://你的服務.onrender.com`。先確認 `/api/health` 回傳 ok。
4. 等前端網址確定後，在 Render 的環境變數 `CORS_ORIGINS` 設為你的 Cloudflare Pages 網址（例如 `https://stock-island.pages.dev`）。重新部署。

## 部署前端：Cloudflare Pages
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → 選擇新 `stock-island` repository。
2. Root directory / Build directory 設 `frontend`（若介面顯示 Project root）；Build command `npm run build`；Build output directory `dist`。
3. 環境變數 `VITE_API_URL` 設為上一步 Render 後端 HTTPS 網址（**不要**加 `/api`）。
4. 部署後取得 `https://你的專案.pages.dev`，將其填入 Render 的 `CORS_ORIGINS`。
5. 重新部署前後端，確認手機 Safari / Chrome 可以搜尋並載入日K。

> Render 免費方案可能休眠；Cloudflare Pages 僅託管前端，不會自動執行 Python API。請以供應商當時的方案、計價與設定頁面為準。

## 後續版本
- 舊版亞當演算法正式移植與回測；日週月K與分鐘K；完整波段選取與未來日期顯示改善
- 更完整的股票搜尋、上櫃行情、資料快取、使用者自選股
- 籌碼島、價值島、ETF島、到價警示

## 安全
不要把 GitHub Token、付費行情 API Key 或密碼放進前端 `.env`；公開網站的 VITE_* 變數可被瀏覽器讀取。正式版需加上快取、流量限制及來源合規檢查。
