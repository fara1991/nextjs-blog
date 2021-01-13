---
title: AWS EC2インスタンスからMacを操作する
created: 2020/12/27
updated:
tags: AWS, EC2, Mac
image: 
---

おはようございます。

普段Windows WSLやUbuntuで開発をしている私ですが、最近会社でiOSアプリの開発に若干携わることがあり、Windowsで環境構築できないか探していました。

Windows PC上ではできないようですが、どうやらMac OSがインストールされたインスタンスを使うことができるようです。が、正直使いにくいです・・・。ある程度動作も早ければ`xcode`を動かせそうですが、まともに動かすのは難しそうです。

#### AWS記事について
iOSアプリ開発にはMac OSが必須になりますが、諸々の理由でMacを購入したくない人でもMac環境をAWS EC2で作成できるようになりました。

[New – Use Amazon EC2 Mac Instances to Build & Test macOS, iOS, iPadOS, tvOS, and watchOS Apps](https://aws.amazon.com/jp/blogs/aws/new-use-mac-instances-to-build-test-macos-ios-ipados-tvos-and-watchos-apps/)

なのでEC2インスタンスでどの程度できるのか試しました。手順を書きます。簡易的に書くと、
* EC2 Macインスタンスを起動する
* EC2 MacインスタンスをVNC(Virtual Network Computing)接続できるようにする
* ローカルPCからリモート接続をする

このようになります。ローカルPCは`Windows 10`前提で書きます。ローカルPCがMacでも接続できますが、それならEC2インスタンスを立ち上げる必要がおそらくないと思うのでここでは書きません。

#### EC2 Macインスタンス起動
1. AWSにログインして、リージョンをバージニア北部に変更します。
1. `専有ホスト`を初めに設定します。専有ホストはMicrosoft等のソフトウェアライセンスを使用できます。

   ![ec2 host](/article/ec2-mac01.png#center)

1. 専有ホストの設定を以下のように設定し、割り当てを選択します。

   ![ec2 host setting](/article/ec2-mac02.png#center)

1. EC2インスタンスを以下の設定で起動します。

   ![create instance](/article/ec2-mac03.png#center)
   
   ---
   
   ![select instance type](/article/ec2-mac04.png#center)
   
   ---
   
   ![detail setting](/article/ec2-mac05.png#center)

   ---

   ![storage size](/article/ec2-mac06.png#center)

   ---

   ![security group](/article/ec2-mac07.png#center)

セキュリティグループ設定の画像ではソースを0.0.0.0/0にしていますが、 安全のためにマイIPにしておく方がいいと思います。

ここまででMacインスタンス作成は終了し、次は実際にインスタンスに接続します。

#### EC2インスタンス接続

ここからは立ち上げたインスタンスにSSH接続し、VNCを有効にする作業になります。これを行うことで、インスタンスへのリモート操作が可能になります。

1. terminalを開き、次のコマンドでSSH接続します。インスタンスのIPと秘密鍵のpemファイルのディレクトリ先は各自置き換えてください。
   ```shell
   ssh ec2-user@xxx.xxx.xxx.xxx -i xxx.pem
   ```

   成功すると以下のような表示とともにインスタンス内に接続した状態にします。
   ```shell
   
                .:'
            __ :'__       __|  __|_  )
         .'`  `-'  ``.    _|  (     /
        :          .-'   ___|\___|___|
        :         :
         :         `-;   Amazon EC2
          `.__.-.__.'    macOS Catalina 10.15.7
   ```

1. ログイン時のパスワードを設定します。
   ```shell
   sudo dscl . -passwd /Users/ec2-user (パスワード)
   ```
   
1. VNCを有効にします。
   ```shell
   sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart \
        -activate -configure -access -on -clientopts -setvnclegacy -vnclegacy yes \
        -clientopts -setvncpw -vncpw (設定したパスワード) -restart -agent -privs -all
   ```

#### ローカルPCからVNCで接続

1. [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/)をインストールします。
1. VNC Viewerを起動し、FileタブのNew Connectionを選択。その後VNC ServerにインスタンスのIPアドレスを入力してOKを選択します。

   ![VNC Viewer](/article/vnc-viewer01.png)
   
1. VNC Viewer画面にインスタンス接続先が表示されるので、ここから接続します。成功するとMacのログイン画面が表示されます。

これでMacを操作できます。インスタンスを一度停止させると、容量不足で起動できないことがあるので、ボリュームの容量を上げると解決できます。
