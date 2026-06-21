// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages (プロジェクトページ) 公開設定
//   公開URL: https://fcircle-biz.github.io/fcircle-sites/
//   - site : 公開ドメイン
//   - base : リポジトリ名のサブパス
//   - outDir: GitHub Pages の「/docs フォルダ」公開に合わせて docs へ出力
// https://docs.astro.build/ja/guides/deploy/github/
export default defineConfig({
  site: 'https://fcircle-biz.github.io',
  base: '/fcircle-sites',
  outDir: './docs',
  trailingSlash: 'ignore',
});
