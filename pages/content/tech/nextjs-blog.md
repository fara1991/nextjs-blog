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

#### ブログ記事構築手順
GitLabリポジトリを作っているので、もし使いたい人がいれば[Gitlabリポジトリ](https://gitlab.com/game_Fara/nextjs-blog)から`git clone`、自分のアカウント上にリポジトリ作成し、コピーして使ってください。

1. [Docker](https://www.docker.com/products/docker-desktop)をインストールして起動する。
1. ターミナルで以下を実行する。
    ```shell
      # 初回のみ
      sudo apt-get install -y docker-compose git
      git clone https://gitlab.com/game_Fara/nextjs-blog.git
    ```
    ```shell
      cd nextjs-blog
      docker-compose up -d --build
    ```

1. 自身で管理したい任意のリポジトリを作成し、`nextjs-blog`フォルダ以下をすべてコピーする。以降は自身のフォルダ内で作業する。
1. `pages/content/template`以下のmarkDownファイルをコピーし、`pages/content`以下の任意の場所に配置する。
URLは`http://localhost/(...folderName)/(fileName)`となる。

後はブログで公開したい内容を`pages/content`以下のmarkDownファイルに記述し、git更新、Vercelにデプロイをすれば反映される。

[Vercel](https://vercel.com/login)アカウントを作成後、Gitリポジトリと連携し、デプロイを行う。

これでVercelで用意されているサーバを使って構築された状態になる。

細かいところは省きましたが、これではわからないということであれば私のツイッターアカウント宛てにツイートしてください。

[Twitter](https://twitter.com/game_Fara)

#### 参考

[Next.jsを使った JAMstack なブログの始め方](https://gotohayato.com/content/517/)

ベースはこちらの方を参考に、TypeScript化やディレクトリ構成等を変更しました。

[脱TSLintして、ESLint TypeScript Plugin に移行する](https://qiita.com/suzuki_sh/items/fe9b60c4f9e1dbc5d903)

esLint + prettierのコード整形を導入しました。

[React Bootstrap](https://react-bootstrap.github.io/)

[React Tutorial](https://ja.reactjs.org/tutorial/tutorial.html)
