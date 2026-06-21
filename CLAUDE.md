# CLAUDE.md

このリポジトリで作業するエージェント向けの要点メモ。詳細は [README.md](README.md) を参照。

## 何のプロジェクトか

フリーランス（屋号: F-Circle）の自己紹介**1ページサイト**。[Astro](https://astro.build/) 製、静的出力、GitHub Pages 公開。

- 公開URL: https://www.f-circle.biz/ （カスタムドメイン）/ https://fcircle-biz.github.io/fcircle-sites/
- 本文はすべて [src/pages/index.astro](src/pages/index.astro) に集約（セクション = プロフィール/支援領域/強み/対応領域/技術スタック/仕事の進め方/お問い合わせ）。
- レイアウト・配色はデザイン元 `work/F-Circle Profile.html` を移植した**インラインスタイル**で自己完結。共通シェルとSEOメタは [src/layouts/Layout.astro](src/layouts/Layout.astro)。

## コマンド

```bash
npm run dev     # 開発サーバー → http://localhost:4321/fcircle-sites/
npm run build   # 本番ビルド。成果物は docs/ に出力（outDir 設定）
npm run preview # ビルド成果物のプレビュー
```

## ⚠️ デプロイの最重要ルール（必読）

GitHub Pages は **main ブランチの `/docs` フォルダ**を「Deploy from a branch」方式で配信している。
GitHub Actions ビルドは無い。**`docs/` の中身がそのまま公開される。**

つまり:

> **`src/` を編集しただけでは公開サイトは変わらない。**
> 必ず `npm run build` で `docs/` を再生成し、`docs/` も一緒にコミット＆プッシュすること。

変更を反映する手順は常にワンセット:

1. `src/` を編集
2. `npm run build`（→ `docs/` 更新）
3. `git add` で **`src/` と `docs/` の両方**をステージしてコミット
4. `git push origin main` → 1〜2分後に公開サイトへ反映

`docs/` は `.gitignore` で**除外していない**（コミット対象）。`dist/` は使わない。

## ⚠️ ビルドが `docs/` をクリーンする → public/ で資産を守る

`astro build` は出力前に `docs/` を空にする。`docs/` に直接置いたファイルはビルドで**消える**。
公開に必須の以下は `public/` に置いて毎回自動コピーさせている（直接 `docs/` に置かない）:

- `public/CNAME` … カスタムドメイン `www.f-circle.biz`（消えるとドメインが壊れる）
- `public/.nojekyll` … Astro の `_astro/` を Jekyll に無視させない
- `public/favicon.svg`

## 残プレースホルダー

[src/pages/index.astro](src/pages/index.astro) のお問い合わせフォームURL `https://forms.example.com/contact` は未確定。実URLが決まったら差し替える。
（氏名・メール・GitHubリンク・SNS整理は対応済み）

## コミットメッセージ

日本語で記述する（既存履歴に準拠）。
