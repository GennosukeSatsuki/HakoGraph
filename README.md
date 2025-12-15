# Hakogaki Editor (箱書きエディタ)

Tauri + React + TypeScript で構築された箱書きエディタです。
コンセプトに基づき、ダークモードのプレミアムなUIを採用しています。

## 機能

- **シーン管理**: グリッド表示でのシーン一覧確認
- **詳細編集**: モーダルによる詳細項目の編集
- **保存**: ローカルステートでの管理（永続化機能は今後実装予定）

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

シーンには以下の項目が含まれます：

- シーンタイトル
- 章タイトル
- 登場人物
- 時間
- 狙いと役割
- 詳細なあらすじ
- 裏設定
