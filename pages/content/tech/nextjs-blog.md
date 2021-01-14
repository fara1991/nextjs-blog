---
title: Next.jsでブログを構築
created: 2020/12/25
updated: 
tags: React.js, Next.js, TypeScript
image: 
---

おはようございます。タイトルの通り、Next.jsを用いてブログ構築をしました。

構築理由は、これまでバックエンド側の業務がメインで、フロントエンド側のことをほとんど知らない状態だったためです。TypeScriptやWebデザインについて少しでも知っておこうと思い、何か技術的な知見を蓄積するにはブログが適していると思いました。

#### 構築内容

* 【OS】 Windows 10
* 【開発環境】 WSL, Docker, docker-compose, node
* 【言語】 TypeScript
* 【ライブラリ】 React
* 【フレームワーク】 Next.js, Bootstrap
* 【ホスティング】 Vercel

#### 構築手順
1. [Docker](https://www.docker.com/products/docker-desktop)をインストールして起動。
1. ターミナルで以下を実行。
    ```shell
      git clone https://gitlab.com/game_Fara/nextjs-blog-template
      cd nextjs-blog
      docker-compose up -d --build
    ```

1. 自身で管理したい任意のリポジトリを作成し、`nextjs-blog`フォルダ以下をすべてコピーします。以降は自身のフォルダ内で作業します。
1. `pages/content/template`以下のmarkDownファイルをコピーし、`pages/content`以下の任意の場所に配置。
URLは`http://localhost/(...folderName)/(fileName)`となる。

後はブログで公開したい内容を`pages/content`以下のmarkDownファイルに記述し、git更新、Vercelにデプロイすれば反映されます。[Vercel](https://vercel.com/login)アカウントを作成後、Gitリポジトリと連携し、デプロイを行います。

これでVercelで用意されているサーバを使って構築された状態になります。 細かいところは省きましたが、不明点は私のTwitterアカウント宛てにTweetしてください。Profile内にTwitterへのリンクボタンがあります。

#### 参考

[Next.jsを使った JAMstack なブログの始め方](https://gotohayato.com/content/517/)

[脱TSLintして、ESLint TypeScript Plugin に移行する](https://qiita.com/suzuki_sh/items/fe9b60c4f9e1dbc5d903)

[React Bootstrap](https://react-bootstrap.github.io/)

[React Tutorial](https://ja.reactjs.org/tutorial/tutorial.html)
