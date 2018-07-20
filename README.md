# <img width='300px' alt='Lagune' src='https://i.imgur.com/im0wxKy.png' />

[![Build Status](https://travis-ci.org/LaguneHQ/lagune.svg?branch=master)](https://travis-ci.org/LaguneHQ/lagune)
[![Maintainability](https://api.codeclimate.com/v1/badges/b09147a4ae45990c99a5/maintainability)](https://codeclimate.com/github/LaguneHQ/lagune/maintainability)

DesktopのMastodonクライアントを作るかもしれません。

Snapshot (WIP):
![Snapshot](https://i.imgur.com/Y4MTzxV.jpg)

## メモ
今のところフルタイムでガシガシ開発しているわけではありません... ほかのプロジェクトとか勉強とか酸素の吸引とかと平行してやっているので1st releaseは気長に待ってください。年内に完成すればいいな〜くらいのレベル

というか、核の部分になってるReduxのTypeScript-FsaっていうライブラリとActionの非同期化をするRedux-sagaのラッパーライブラリのTypescript-fsa-redux-sagaっていうライブラリのtakeEvery関数の型情報がガバガバでパッチは打ってbeta出てるんだけどstableリリースはBabel 7のstable待ち...という感じで滞っています(謎)

### 機能
いちおう、ご覧の通り Electron製アプリで、Linux Windows macOSで動きます。そんで、マルチアカウントで、マルチカラムで、拡張機能対応になるようにしていくぞ〜という感じで、設計も大体できていて、あとは脳内のものをタイプして間違いがないかというのを確認していく感じになります。

このorgにある [@LaguneHQ/core](https://github.com/LaguneHQ/core) と [@LaguneHQ/server](https://github.com/LaguneHQ/server) は、それぞれ、MastodonのAPIクライアントと、アプリ登録用バックエンドの分離リポです。


### はよ出せ
貢ぐと開発が早くなります
- [Patreon](https://www.patreon.com/neetshin)
- BitCoin -> 3AucsLDnY37qipYngLM5KH9heWkJ1AEArv
