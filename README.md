# Webサイト制作用タスクランナー

## Version
### 2021.01.xx
- タスクランナーをGulpからnpm scriptsに変更
- node-sassをdart-sassに変更予定
- watchはchokidarがよく使われてそうなのでchokidar採用
- webpack依存しないようにCSSとJSは分ける
  slickなどwebpackでまとめるCSSもあるのでstyle-loaderは必要
- pugは初期構築のみでwordpressなど組み込み時に削除する。
- pug-cliはnpmのものが_includeファイルまで出力されてしまうので、GITのバージョンを使用
- npm-run-allは使ってないが入れておく

## インストール

- node バージョン14.x
- 下記不要なものは外すdependencies
- worpdressの場合はpath_destの値をpath_wpに変更
- - gsap
- - jquery-jpostal-ja
- - slick-carousel
```bash
npm install
```

## タスクランナー実行
```bash
npm run watch
```

# 各サイトに必要な情報あれば下記に記述

