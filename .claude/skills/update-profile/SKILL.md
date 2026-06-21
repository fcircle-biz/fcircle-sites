---
name: update-profile
description: F-Circle 自己紹介サイトのプロフィール内容（氏名・経歴・技術スタック・支援領域・連絡先・SNSリンク等）を更新し、ビルドして GitHub Pages へ公開反映するときに使う。「プロフィールを更新」「技術スタックを直す」「連絡先を変えたい」「サイトの○○を変更」などの依頼で起動する。
---

# プロフィール更新ワークフロー

F-Circle 自己紹介サイト（Astro / GitHub Pages）のプロフィール内容を更新するための手順。
詳細な背景は [CLAUDE.md](../../../CLAUDE.md) も参照。

## 編集対象の場所

本文はすべて 1 ファイルに集約されている:

- **[src/pages/index.astro](../../../src/pages/index.astro)** — トップページ全体。セクション構成:
  - プロフィール概要（経験年数・専門・役割・対応工程・形態）
  - ヒーロー（キャッチコピー・実績数値: IT実務経験 / Java開発経験 など）
  - 支援領域（テックリード支援 / DX・AX推進支援）
  - 強み / 対応領域
  - **技術スタック**（Languages / Database / Cloud / Low-code / AI Tools / Tech Lead の行）
  - 仕事の進め方（01〜08 の工程）
  - お問い合わせ（フォームURL・メール・Links）
- ヘッダーの氏名表記、`<title>` / OGメタは [src/layouts/Layout.astro](../../../src/layouts/Layout.astro) と index.astro 冒頭の `const title` 付近。

レイアウト・配色は**インラインスタイル**で自己完結。既存要素をコピーして文言だけ差し替えるとスタイルが揃う（例: 技術スタックのタグ `<span>` は同じ style を流用して追加する）。

## 手順

1. **依頼内容を index.astro の該当セクションに反映**する。`grep` で対象文字列を探してから編集する。
   - タグ追加: 隣接する既存 `<span style="...">` をそのまま複製して中身を差し替え。
   - 強調を外す/付ける: 番号バッジは枠線版 `border:1px solid var(--accent); color:var(--accent)` が通常、塗り版 `background:var(--navy); color:#fff` が強調。

2. **dev サーバーで見た目を確認**（任意だが推奨）:
   ```bash
   npm run dev   # http://localhost:4321/fcircle-sites/
   ```
   `curl -s http://localhost:4321/fcircle-sites | grep ...` で反映を検証してもよい。

3. **🔴 ビルドして docs/ を再生成**（公開反映に必須・忘れやすい）:
   ```bash
   npm run build
   ```
   GitHub Pages は **main の `/docs` フォルダ**を配信している。`src/` を直しただけでは公開サイトは変わらない。`docs/` を再生成しないと反映されない。

4. **src/ と docs/ の両方をコミット＆プッシュ**:
   ```bash
   git add src public docs
   git commit -m "<日本語の要約>"   # 末尾に Co-Authored-By 行
   git push origin main
   ```
   プッシュ後、GitHub の「pages build and deployment」が走り 1〜2 分で公開反映。

5. **反映確認**: ブラウザを Ctrl+Shift+R でハードリロード（https://www.f-circle.biz/ または https://fcircle-biz.github.io/fcircle-sites/）。dev サーバーで見ている場合もキャッシュに注意。

## 必ず守ること

- **`docs/` を一緒にコミットする。** これを忘れると「直したのに公開サイトが古い」事故になる（実際に発生済み）。
- **`CNAME` / `.nojekyll` を `docs/` に直接置かない。** `astro build` は `docs/` をクリーンするため消える。これらは `public/` に置いてあり、ビルドで自動コピーされる。`public/CNAME` = `www.f-circle.biz`。
- コミットメッセージは**日本語**（既存履歴に準拠）。
- 既存のインラインスタイルの style 値は変えず、構造・文言だけ触る（デザイン統一のため）。

## よく使う検証コマンド

```bash
# 反映チェック例（ビルド後の docs/ に対して）
grep -oE ">(Your Name|Satoshi Ichimaru)<" docs/index.html   # 氏名
grep -c ">React<" docs/index.html                           # タグ有無
cat docs/CNAME                                              # ドメイン保持確認
```
