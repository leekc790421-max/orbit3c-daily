# Orbit Daily — 自動排程發佈系統

光曜星樞 SNT 內容引擎，部署於 `orbit3c.xingdeng.tw`

## 功能

- ✅ 批量預產文章 + 日期自動上架
- ✅ Markdown + Frontmatter 支援
- ✅ 分類篩選（daily / cold-knowledge / overseas / comic）
- ✅ 標籤系統
- ✅ RSS Feed 自動產生
- ✅ SEO 優化（Open Graph、meta tags）
- ✅ 閱讀時間估算
- ✅ 文章底部導流區塊（光曜官網 + 3D 總部）
- ✅ 日期過濾：只顯示 `date <= 今天` 的文章

## 文章格式

在 `content/posts/` 目錄下建立 `.md` 檔案，命名格式：`YYYY-MM-DD-slug.md`

```markdown
---
title: "文章標題"
date: "2026-10-25"
description: "SEO 描述，150 字以內"
tags: ["AI", "3D"]
category: "daily"
draft: false
---

文章內容...
```

## 本地開發

```bash
npm install
npm run dev
```

開啟 http://localhost:3000

## 部署到 Vercel

### 步驟 1：建立 GitHub 倉庫

1. 到 https://github.com/new
2. Repository name：`orbit3c-daily`
3. 選 **Public** 或 **Private**（Vercel 免費版支援 Private）
4. 點 **Create repository**

### 步驟 2：上傳程式碼

```bash
cd orbit3c
git init
git add .
git commit -m "Initial commit: Orbit Daily auto-publish system"
git branch -M main
git remote add origin https://github.com/你的帳號/orbit3c-daily.git
git push -u origin main
```

### 步驟 3：Vercel 部署

1. 到 https://vercel.com/new
2. Import Git Repository → 選擇 `orbit3c-daily`
3. Framework Preset：Next.js（應該自動偵測）
4. Build Command：`npm run build`
5. Output Directory：`.next`
6. 點 **Deploy**

### 步驟 4：綁定子網域

1. Vercel 專案 → Settings → Domains
2. 輸入 `orbit3c.xingdeng.tw`
3. 依照指示設定 DNS（CNAME 或 A record）
4. 等待 SSL 憑證自動簽發（約 1-5 分鐘）

## 驗收測試

- [ ] 放入 `date` 是未來的文章 → 網站上看不到
- [ ] 把該篇文章的 `date` 改成今天 → 立刻出現在列表
- [ ] 首頁與列表都有正確排序（由新到舊）
- [ ] RSS feed 正常：https://orbit3c.xingdeng.tw/rss.xml
- [ ] 手機版可正常閱讀
- [ ] 文章底部有導流區塊

## 技術棧

- Next.js 14 (App Router)
- TypeScript
- gray-matter（Markdown 解析）
- remark + remark-html（Markdown 轉 HTML）
- Vercel 部署

## 內容管理

新增文章只需在 `content/posts/` 目錄下新增 `.md` 檔案，push 到 GitHub 後 Vercel 會自動重新部署。

系統會自動過濾：
- `draft: true` 的文章不會顯示
- `date > 今天` 的文章不會顯示

---

© 2026 光曜星樞 SNT · Singularity Nexus Technology
