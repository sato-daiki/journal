/**
 * Analytics event
 *
 * Rules:
 *   - リソースの作成 => CREATED_xx
 *   - リソースの取得 => OPENED_xx
 *   - リソースの更新 => UPDATED_xx
 *   - リソースの削除 => DELETED_xx
 */

export default {
  /* 初期登録系 */
  // ユーザの初期登録
  OPENED_INITIALIZE: 'OPENED_INITIALIZE',
  OPENED_SELECT_LANGUAGE: 'OPENED_SELECT_LANGUAGE',
  OPENED_INPUT_USER_NAME: 'OPENED_INPUT_USER_NAME',
  OPENED_SIGN_UP: 'OPENED_SIGN_UP',
  // 初期登録完了
  CREATED_USER: 'CREATED_USER',

  /* ユーザ操作系 */
  // ログイン画面を開く
  OPENED_SIGN_IN: 'OPENED_SIGN_IN',
  // サインイン完了
  SIGN_IN: 'SIGN_IN',
  // サインアウト
  SIGN_OUT: 'SIGN_OUT',
  // ユーザ削除
  DELETED_USER: 'DELETED_USER',

  // 日記投稿
  CREATED_DIARY: 'CREATED_DIARY',
  // 添削開始
  CREATED_CORRECTING: 'CREATED_CORRECTING',
  // 添削完了
  CREATED_CORRECTION: 'CREATED_CORRECTION',
  // レビュー作成
  CREATED_REVIEW: 'CREATED_REVIEW',
};
