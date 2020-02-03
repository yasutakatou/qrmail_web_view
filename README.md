# qrmail_web_view

APIサーバーのWebインタフェースです。昔のWebメール画面みたいな振る舞いをします。<br>

# 前提<br>

APIサーバ―側のリポジトリを参考に、Hyperledger、スマホ、Golang Serverの各セットアップを終えてください<br>

[qrmail_golang_server](https://github.com/yasutakatou/qrmail_golang_server)

このリポジトリを**git clone**で取得すればreactなので**npm start**で起動します。<br>
セキュアにHTTPSで起動させたいので環境変数に**export HTTPS=true**を定義してHTTPSで受けれるようにしましょう。<br>

**.env**にQRコード化するURLを設定します。git cloneしたフォルダ直下に.envをviなどで作成し、

```
REACT_APP_QR_API=https://10.0.0.1:28080/
```

のように一行書きます。**10.0.0.1:28080**の部分は上記、Golang Serverが起動しているIP:PORTを指定します。

# 使い方<br>

**npm start**成功後は起動したサーバーに`https://xxx.xxx.xx.xx:3000/`でアクセスできるようになります。<br>

![0](https://github.com/yasutakatou/qrmail_web_view/blob/pic/0.png)

アクセス出来たらWebメールの感覚で各フォームを入力し、ファイルを添付して送信します。<br>
送信先にはこのサーバーの/viewという参照先のURLが届きますのでクリックして画面を出します。<br>

![1](https://github.com/yasutakatou/qrmail_web_view/blob/pic/1.png)

認証待ちになるのでQRコードをスマホから読み取らせて認証します。成功すれば本文が出ます。<br>

![2](https://github.com/yasutakatou/qrmail_web_view/blob/pic/2.png)

送信元には削除用QRコードが届いているので消したい場合は送信元のアドレスとIMEIをHyperledgerに登録して、読み取らせます。<br>
