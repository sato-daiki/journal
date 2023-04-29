# journal

ルール：
iOS はシュミレータ
Android は実機で実装

## iOS 開発

### 初回のみ

eas build --profile development-simulator --platform ios

### 実行するとき

yarn start

## Android 開発

### 初回のみ

eas build --profile development --platform android

### 実行するとき

yarn start

# 実際のリリースと同じ状態で確認（これは修正ごとに update が必要）

eas build --profile preview --platform all

# リリース

- 中身の JS だけ更新する場合 → 2,3,4,5 だけで OK
- アプリをビルドし直して app store に申請する場合 → 1,2,4,5,6,7 を実行

### 1. version 更新

まず`app.json`の`version`, `buildNumber`, `versionCode`を更新する。

### 2. revision 更新

`app.json`の`revision`を更新する。  
publish する度に+1。新 version を build するときは 0 に戻す。

eas build --profile production --platform all

eas submit -p ios

eas submit -p android

# UPDATE（AppStore. PlayStore 通さないでリリースできる）

eas update --branch production --message "Updating the app"
