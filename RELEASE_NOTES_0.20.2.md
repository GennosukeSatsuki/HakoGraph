# Release Notes - v0.20.2

## 🐛 バグ修正

### 📱 Android版の改善
- **シーン入れ替え機能の修正**: Android版でシーンカードをドラッグして並び替えができなかった問題を修正しました。
  - TouchSensorを追加し、タッチ操作によるドラッグ&ドロップに対応しました。
  - 長押し（250ms）でドラッグを開始するようになります。

## 📦 ダウンロード

### デスクトップ版
- **macOS**: `箱書きエディタ_0.20.2_universal.dmg`
- **Windows**: `箱書きエディタ_0.20.2_x64-setup.exe`
- **Linux**: `箱書きエディタ_0.20.2_amd64.deb`

### モバイル版
- **Android**: `app-universal-debug.apk`

## 🔧 技術的な変更
- @dnd-kit/core の TouchSensor を追加
- モバイルデバイスでのタッチイベントに対応
