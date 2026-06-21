# fcircle-sites

フリーランス向け 自己紹介サイト。[Astro](https://astro.build/) で構築し、GitHub Pages で公開します。

## 必要環境

- Node.js 20 以上（推奨: v24 系）
- npm

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

開発サーバーは `base` 設定に合わせて以下で起動します。

- http://localhost:4321/fcircle-sites/

## ビルド

```bash
npm run build
```

成果物は `docs/` に出力されます（GitHub Pages の「/docs フォルダ」公開用）。

## デプロイ（GitHub Pages）

1. ビルドして `docs/` を生成・コミットする。
2. GitHub リポジトリの **Settings → Pages** で、Source を「Deploy from a branch」、
   ブランチ `main` / フォルダ `/docs` に設定する。
3. 公開URL: https://fcircle-biz.github.io/fcircle-sites/

> `docs/.nojekyll` を出力することで、Astro の `_astro/` ディレクトリが
> Jekyll に無視されず正しく配信されます（`public/.nojekyll` から自動コピー）。

## ディレクトリ構成

```
.
├── public/          # 静的ファイル（そのまま出力ルートへコピー）
│   ├── .nojekyll
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro   # ドキュメントシェル + SEO メタ + 共通スタイル
│   └── pages/
│       └── index.astro    # トップ（自己紹介1ページ。デザインを移植）
├── work/            # デザイン元（参考・ビルド対象外 / git 管理外）
│   └── F-Circle Profile.html
├── docs/            # ビルド成果物（GitHub Pages 公開用 / コミット対象）
└── astro.config.mjs # site / base / outDir 設定
```

## デザインについて

トップページは `work/F-Circle Profile.html`（デザインツール書き出し）を
Web 標準へ移植したものです。レイアウト・配色はデザイン元のインラインスタイルに準拠し、
スクロール時のフェードイン演出（`data-reveal`）も `index.astro` 内のスクリプトで再現しています。

## 要差し替えのプレースホルダー

公開前に [src/pages/index.astro](src/pages/index.astro) の以下を実値へ更新してください。

- ヘッダーの `Your Name`（氏名/屋号表記）
- お問い合わせ: メールアドレス `example@example.com`
- お問い合わせフォーム URL `https://forms.example.com/contact`
- SNS リンク（GitHub / LinkedIn / X）の `href="#"`
