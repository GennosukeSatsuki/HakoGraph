# 箱書きエディタ

Tauri + React + TypeScript で構築された箱書きエディタです。
小説を書いてて、僕が欲しかったものをつくりました。
Excelで箱書きを作っても、シーンごとのファイルにするのは手動！
こんな地獄からは抜け出したかった。

## 機能

- **シーン管理**: グリッド表示でのシーン一覧確認 
![alt text](screenshot/app.png) 

- **詳細編集**: モーダルによる詳細項目の編集 
![alt text](screenshot/add.png) 

- **シーンの入れ替え**: シーンの入れ替えはドラッグアンドドロップで行えます。

- **書き出し**: 書き出しを選んで、フォルダを選ぶとそこに「数字_章タイトルフォルダ」が作られ、シーン名のついたテキストファイルが作成されます。 

![alt text](screenshot/folder.png) 

テキストファイルの中身は以下のようになります。 

![alt text](screenshot/txt.png)

## 必要環境

- Node.js (v16+)
- Rust (Tauriのビルドに必要)

## 開発（ローカル実行）

```bash
npm install
npm run dev
```

## ビルド（インストーラー作成）

WindowsまたMacそれぞれの環境で以下を実行してください。

```bash
npm run tauri build
```

- Mac: `.dmg` ファイルが生成されます (`src-tauri/target/release/bundle/dmg/`)
- Windows: `.msi` または `.exe` が生成されます (`src-tauri/target/release/bundle/msi/`)

## データ構造

箱書きエディタの保存ファイルですが、分かりやすいようにファイルの拡張子は.hakoとしています。

でも、中身はただのjsonなのでそちらから編集することも可能です。

シーンには以下の項目が含まれます：

- シーンタイトル
- 章タイトル
- 登場人物
- 時間
- 狙いと役割
- 詳細なあらすじ
- 裏設定
