# 自身の写真サイトです

[Journery's Photo](https://www.teraphoto.net/)

## 以下、使用言語 フレームワーク ライブラリ等

### Next.js

SSG を使ってみたかったので Next.js を採用しました。

### Typescript

型を使って安全にデータを扱う為にも Typescript を採用しています。

### Framer Motion

アニメーションは Framer Motion を使いました。

アニメーションに関しては全然わからなかったので、人気がありそうな Framer Motion を採用しました。

とはいえ、簡単なものは css でアニメーションをつけています。

### Tailwind CSS

css ライブラリは Tailwind CSS を使ってみました。

自分でデザインをしてみたいと思ったので Material-UI 等を使わず Tailwind CSS を採用しました。

### JEST

テストには JEST を採用しました。

web サイトなのでテストを書く必要性があるかどうかは微妙ですが勉強の為に書いてみました。
テスト自体書くのは初めてだったし、どの程度のテストをするべきなのかもわからず一番苦戦したかもしれません。

### Firebase

バックエンドには Firebase の Cloud Functions を採用しています。

バックエンドといっても処理としては Firebase Storage にディレクトリ、写真の追加をすると サイズ形成をして Storage に保存し直され Firestore 側にも自動的に必要なデータを取得して保存されます。
Storage 側でディレクトリ、写真の削除をした時も Cloud Firestore 側の同データが削除される様にしています。

### Vercel

Hosting 先は Vercel です。

Firebase でも良かったのですが、Next.js を使っている事と、github と連携して簡単に Host 出来るとの事だったので Vercel を使ってみました。
