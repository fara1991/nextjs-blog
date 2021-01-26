---
title: NLPについて学習した
created: 2021/01/19
updated: 
tags: Python, NLP
image: 
---
updatedはなくてもよい。tagsはつけたいタグを','区切りでつなげる。

コピー先を`pages/content/(category)/(ファイル名).md`とすることで、自動でブログ記事対象ページとして読み込まれます。

以下markdown記法サンプル

```shell
* List 1
* List 2
```
* List 1
* List 2

---

```shell
1. Number List 1
1. Number List 2
1. Number List 3
```
1. Number List 1
1. Number List 2
1. Number List 3

---

```shell
# h1 ヘッダ
## h2 ヘッダ
### h3 ヘッダ
#### h4 ヘッダ
##### h5 ヘッダ
###### h6 ヘッダ
```
# h1 ヘッダ
## h2 ヘッダ
### h3 ヘッダ
#### h4 ヘッダ
##### h5 ヘッダ
###### h6 ヘッダ

---

```shell
_Italic_

__Bold__

```
_Italic_

__Bold__

---

```shell
<details>
  details
</details>
```
<details>
  details
</details>

---

```shell
<dl>
  <dt>Definition 1</dt>
  <dd>Definition Description 1</dd>
  <dt>Definition 2</dt>
  <dd>Definition Description 2</dd>
</dl>
```
<dl>
  <dt>Definition 1</dt>
  <dd>Definition Description 1</dd>
  <dt>Definition 2</dt>
  <dd>Definition Description 2</dd>
</dl>

---

---

```shell
[Link](https://www.google.com/)
```
[Link](https://www.google.com/)

---

```shell
![Instead Text](https://qiita-image-store.s3.amazonaws.com/0/45617/015bd058-7ea0-e6a5-b9cb-36a4fb38e59c.png "image title")
```
![Instead Text](https://qiita-image-store.s3.amazonaws.com/0/45617/015bd058-7ea0-e6a5-b9cb-36a4fb38e59c.png "image title")
