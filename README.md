# nextjs-blog
React.js + Next.js + Dockerを使いブログを構築します。

このリポジトリは、以下のサイトを参考に構築しています。
- [Next.js を使った JAMstack なブログの始め方 | gotohayato.com](https://gotohayato.com/content/517/)

## Install
[Docker](https://www.docker.com/get-started)

## SetUp
コマンド入力できれば、WSLやHyper-V等どんな環境でも構いません。以下のコマンドでローカル環境構築できます。
```shell
git clone https://gitlab.com/game_Fara/nextjs-blog.git
cd nextjs-blog
docker-compose up -d --build
```

## Usage
新規で記事を書く場合は、`pages/content/`以下にカテゴリ名のフォルダを作成し、その下に`.md`ファイルを作成します。

ex) `tech`カテゴリに`aws-start`という記事を書きたい場合、
```shell
pages/content/tech/aws-start.md
```
のようにファイルを作成します。

次に記事のタイトル等の設定をします。
```shell
---
title: (タイトル名)
created: (作成日)
updated: (更新日 なくても良い)
tags: (タグ カンマ区切りで複数可)
image: (今のところ意味なし)
---
```

## Reference

### Google Analytics のトラッキングコードを入れる

環境変数 `GA_TRACKING_ID` でトラッキング ID をセットすれば、 Google Analytics のトラッキングコードをページに埋め込むことができます。

環境変数はターミナルでセットする方法と `.env.local` ファイルを使用する方法が用意されているので、どちらでもやりやすい方を選んでください。

ターミナル:

```bash
export GA_TRACKING_ID=UA-XXX-XX
```

`.env.local` ファイル:

```text
GA_TRACKING_ID=UA-XXX-XX
```

具体的にどのような形でトラッキングコードが埋め込まれているか知りたい場合は、プロジェクト内の `GA_TRACKING_ID` の使用箇所を探してみてください。

```bash
rg GA_TRACKING_ID
```

その他、Profile等自由に編集してください。
* `nextjs-blog-template/components/Profile.tsx`
* `nextjs-blog-template/components/Layout.tsx`

参考:

- [Basic Features: Environment Variables | Next.js](https://nextjs.org/docs/basic-features/environment-variables)
