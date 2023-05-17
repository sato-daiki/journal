// 共通のワード
const common = {
  cancel: 'キャンセル',
  close: '閉じる',
  confirmation: '確認',
  error: 'エラー',
  done: '完了',
  edit: '編集',
  register: '登録',
  sending: '送信',
  next: '次へ',
  check: '添削',
  draft: '下書き保存',
  skip: 'スキップ',
  save: '保存',
  add: '追加',
  delete: '削除',
  translation: '翻訳',
  speech: '読む',
  slow: '遅く',
  back: '戻る',
  begin: 'はじめる',
  time: '時刻を選択して下さい',
};

const day = {
  sunday: '日曜日',
  monday: '月曜日',
  tuesday: '火曜日',
  wednesday: '水曜日',
  thursday: '木曜日',
  friday: '金曜日',
  saturday: '土曜日',
};

const shortDay = {
  sunday: '日',
  monday: '月',
  tuesday: '火',
  wednesday: '水',
  thursday: '木',
  friday: '金',
  saturday: '土',
};

// タブ
const mainTab = {
  myDiary: 'マイ日記',
  postDiary: '日記を書く',
  myPage: 'マイページ',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: 'エラーが発生しました',
  wrongPassword: 'パスワードが違います',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  weakPassword: 'パスワードは6桁以上で入力してください',
  userNotFound: 'メールアドレスが存在しません',
  emailAlreadyInUse: 'このメールアドレスはすでに登録されています',
  tooManyRequests:
    'エラーの数が一定数を超えました。時間をおいてから再度お試しください',
  network: '通信エラーが発生しました。時間をおいて再度お試し下さい。',
  defaultError: 'エラーが発生しました。{{message}}',
  emptyUserName: 'ユーザーネームを入力してください',
  invalidUserName:
    'ユーザーネームは半角英数字と_（アンダーバー）と.（ピリオド）以外使えません',
  initialUserName: '先頭の文字は半角英数字以外使えません',
  userNameAlreadyInUse:
    'すでにこのユーザーネームを使用しているユーザーがいます',
  notFound: 'ページが開けません。エラーが発生しました',
  cantLogout: 'メールアドレスが登録されていないため、ログアウトできません。',
  invalidRaiting: '星は1〜5で入力してください',
  correctionAlready:
    'この日記は他の人が添削を始めました。他の日記を再度検索ください。',
  deleteTargetUser:
    'このページは開けません。対象のユーザは削除された可能性があります。',
  deleteTargetPage:
    'このページは開けません。対象のページは削除された可能性があります。',
  emptyTitile: 'Titleが入力されていません',
  emptyText: '本文が入力されていません',
  emptyEmail: 'メールアドレスが入力されていません',
  emptyMessage: 'メッセージが入力されていません',
  lackPointsTitle: 'ポイント不足',
  lackPointsText:
    '文字数{{textLength}}の日記を投稿するには{{usePoint}}ポイントが必要です。ポイントは日記を添削することで溜めることができます',
  exceedingTitleCharacter:
    '文字数オーバーです。Titleは{{textLength}}文字以下で投稿してください',
  exceedingTextCharacter:
    '文字数オーバーです。本文は{{textLength}}文字以下で投稿してください',
  video: '動画再生においてエラーが発生しました',
};

const deleteAcount = {
  headerTitle: '退会について',
  text: '退会すると投稿した日記の情報が完全に消去され、復元することはできません。\n\nそれでも退会を希望する方は下のボタンから退会してください。',
  withdrawal: '退会する',
  confirmation: '本当に退会してもよろしいですか？',
};

const draftDiary = {
  headerTitle: '下書き',
  diaryList: {
    one: '下書き一覧{{count}}件',
    other: '下書き一覧{{count}}件',
    zero: '下書き一覧',
  },
  empty: '下書き一覧はありません',
};

const editEmail = {
  headerTitle: 'メールアドレス変更',
  title: '新しいメールアドレスを入力してください',
  labelEmail: '新しいメールアドレス',
  labelPassword: '現在のパスワード',
};

const editMyProfile = {
  headerTitle: 'プロフィール変更',
  name: '名前',
  userName: 'ユーザー\nネーム',
  placeholderIntroduction: '自己紹介(200字以内)',
  learn: '勉強中',
  native: '話せる言語',
  spoken: 'その他の\n話せる言語',
  imageButton: '画像を変更する',
};

const editPassword = {
  headerTitle: 'パスワード変更',
  forgetText: 'パスワードをお忘れの方は',
  link: 'こちら',
  currentPassword: '現在のパスワード',
  newPassword: '新しいパスワード（６ケタ以上）',
};

const foregetPassword = {
  headerTitle: 'パスワード再設定',
  email: 'メールアドレス',
  title: 'メールアドレスを入力してください',
  subText: 'メールアドレスにパスワードの変更URLを送ります',
};

const initialize = {
  start: 'はじめる',
  acount: 'アカウントをお持ちの方は',
  link: 'こちら',
};

const myDiary = {
  menuDelete: '削除する',
  menuRevise: '修正する',
  confirmMessage: '本当に削除してよろしいでしょうか？',
  origin: '原文の添削結果',
  revised: '修正後の添削結果',
  ai1: 'AI①の添削',
  ai2: 'AI②の添削',
  closeAlert: '保存されていない変更は失われます。閉じてよろしいですか？',
  permissionAudio:
    'マイクの権限がないため、起動できません。設定画面からマイクの設定をONにしてください',
  voiceTitle: '音読トレーニング',
  myVoice: '自分の音声を聞く',
  record: '録音する',
  recommend: '効率的な勉強方法とは？',
  start: '最初から',
  revise: '添削結果を元に修正する',
  adReward: '動画広告を見てAI②でも添削する',
  copiedTitle: 'タイトルをコピーしました',
  copiedText: '本文をコピーしました',
  copied: 'テキストをコピーしました',
  adRewardError: '動画再生においてエラーが発生しました。添削を終了します',
  adLoading: '広告を読み込んでいます',
  noSapling:
    '15~30秒の動画広告を見ることで、Saplingという言語チェックAIで添削を行えます。',
  noSaplingInactive:
    '※ 現在問題が発生しており、一時的にSaplingでのチェックは停止しております。',
  noSaplingButton: '添削する',
  noSaplingWhat: 'Saplingについて詳しくみる',
};

const viewMyDiary = {
  headerTitle: '添削結果',
};

const myDiaryList = {
  headerTitle: 'マイ日記',
  diaryList: {
    one: 'マイ日記一覧{{count}}件',
    other: 'マイ日記一覧{{count}}件',
    zero: 'マイ日記一覧',
  },
  emptyDiary: '日記がありません',
};

const themeCategory = {
  first: 'テーマ',
  second: 'テーマ',
  eiken1: '英検1級',
  eikenPre1: '英検準1級',
  eiken2: '英検2級',
  eikenPre2: '英検準2級',
};

const myPage = {
  headerTitle: 'マイページ',
  editButton: '編集する',
  adGetPoints: '動画広告を見て{{points}}P 獲得',
  timeOut: '次の動画広告 {{activeHour}}~',
};

const onboarding = {
  reminderInitial: '勉強時間を設定',
  reminderSelectTime: '勉強する時間を設定',
  reminderSelectDay: '勉強する日を設定',
  pushSetting: '通知をオンにする',
};

const reminderInitial = {
  text: '勉強は習慣化することが大切です。勉強する時間を固定しましょう。リマインダーを設定すると、勉強開始時間に通知を受け取ることができます。',
  submit: '設定する',
};

const reminderSelectTime = {
  title: '勉強のスケジュールを設定してください',
  fix: '毎日同じ時間',
  custom: 'カスタム',
  studyDay: '曜日',
  time: '時間',
  start: '開始時間',
  end: '終了時間',
  notificationLable: '通知するタイミング',
  notificationStart: '開始時間に通知',
  notificationEnd: '終了時間に通知',
  notificationStartTitle: '勉強開始時間',
  notificationStartBody: '今日もがんばりましょう！',
  notificationEndTitle: '勉強終了時間',
  notificationEndBody: 'お疲れ様でした！',
  notficationAlert:
    '通知設定がoffになっているためリマインダー機能が動作しません。デバイスの設定からLangJournalの通知をonにしてください。',
};

const reminderSelectDay = {
  title: '勉強する曜日を選択してください',
};

const pushSetting = {
  title: 'お知らせをオンにする',
  description:
    'リマインダーを設定した時間になったときなどにお知らせを受け取れます。',
  submit: 'オンにする',
};

const editMyDiaryList = {
  headerTitle: '日記一覧の編集',
};

const postDiary = {
  headerTitle: '新規日記',
  placeholder: '{{maxLength}}字以内',
  correctError: '添削でエラーが発生しました。添削を終了します',
};

const postDraftDiary = {
  headerTitle: '下書きを編集',
};

const postReviseDiary = {
  headerTitle: '日記を修正',
};

const registerEmailPassword = {
  headerTitle: 'メールアドレス/パスワード登録',
  title: 'メールアドレスとパスワードを入力してください',
  subText:
    '機種変更時などのデータの引き継ぎに必要になります。あとでも登録できます。',
  email: 'メールアドレス',
  password: 'パスワード（６ケタ以上）',
};

const reviewList = {
  headerTitle: 'レビュー一覧',
  reviewList: 'レビュー一覧',
};

const selectLanguage = {
  headerTitle: '言語の選択',
  title: '学習する言語を選択してください',
};

const setting = {
  headerTitle: '設定',
  title: '基本設定',
  notice: '通知',
  reminder: 'リマインダー',
  editEmail: 'メールアドレスの変更',
  editPassword: 'パスワードの変更',
  registerEmailPassword: 'メールアドレス/パスワードの登録',
  deleteAcount: '退会について',
  logout: 'ログアウト',
  inquiry: 'お問い合わせ',
  about: 'LangJournalとは',
};

const signIn = {
  headerTitle: 'ログイン',
  email: 'メールアドレス',
  password: 'パスワード',
  login: 'ログイン',
  forgetText: 'パスワードをお忘れの方は',
  link: 'こちら',
};

const signUp = {
  headerTitle: 'メールアドレス登録',
  title: 'メールアドレスとパスワードを入力してください',
  subText:
    '機種変更時などのデータの引き継ぎに必要になります。あとでも登録できます。',
  email: 'メールアドレス',
  password: 'パスワード（６ケタ以上）',
};

const userProfile = {
  headerTitle: 'プロフィール',
  moreRead: '{{count}}件のレビューを全部見る',
  blocked: 'ブロック',
  unBlocked: 'ブロックを解除する',
  report: '報告する',
  diaryList: {
    one: '日記一覧{{count}}件',
    other: '日記一覧{{count}}件',
    zero: '日記一覧',
  },
  topReview: 'トップレビュー',
};

const record = {
  headerTitle: '録音',
  confirmMessage: '削除してよろしいでしょうか？',
  save: '保存する',
  delete: '削除する',
  notSave: '2分以上の音声は保存できません',
};

//  molecules
const emptyDiary = {
  empty: '日記がまだ投稿されていません。',
};

const profileLanguage = {
  learn: '勉強中の言語',
};

const inquiry = {
  headerTitle: 'お問い合わせ',
  email: 'メールアドレス',
  message: 'メッセージ',
  title: 'お問い合わせありがとうございます。',
  thanks: '確認次第すぐに返信いたいします。もうしばらくお待ちください',
};

const emptyMyDiaryList = {
  text: '日記がまだ投稿されていません',
};

const modalDeleteAcount = {
  title: '退会',
  text: 'パスワードを入力して"退会する"ボタンを押してください。',
  button: '退会する',
};

const modalDiaryCancel = {
  message: '保存されていない変更は失われます。閉じてよろしいですか？',
  button: '下書きとして保存',
  close: '保存せず閉じる',
};

const modalSendEmail = {
  title: 'メール送信',
  text: 'メールを送信しました。メールのリンクからパスワードを再設定してください',
};

const myDiaryListMenu = {
  myPage: 'マイページ',
  draftList: '下書き一覧',
  reviewList: 'レビュー一覧',
};

const postDiaryComponent = {
  titleLength: 'Title',
  textLength: '本文',
  draft: '下書き保存',
  hint: 'スライドをみる',
  correct: '以前の添削結果を見る',
};

const sns = {
  app: 'アプリをSNSでシェア',
  diary: '日記をSNSでシェア',
};

const myDiaryStatus = {
  draft: '下書き',
  checked: '添削完了',
  revised: '修正済',
  recorded: '録音済',
  done: '完了',
};

const language = {
  en: '英語',
  de: 'ドイツ語	',
  es: 'スペイン語',
  fr: 'フランス語	',
  pt: 'ポルトガル語	',
  nl: 'オランダ語	',
};

const maintenance = {
  defaultMessage:
    '現在メンテナンス中です。\nご不便をおかけして申し訳ございません。\nしばらくお時間が経ってから\n再度ご利用ください',
};

const selectDiaryType = {
  headerTitle: '型の選択',
  recommend: 'おススメ',
  titleFree: '自由作文',
  titleTheme: 'テーマ作文',
  textFree:
    '日記、今日話せなかったこと、好きな映画。自由テーマで書きましょう。',
  textTheme:
    'お題に沿って文章を書きましょう。書きたいことが思いつかない場合はおすすめ。',
  textEiken1: '英検1級のライティングの過去問',
  textEikenPre1: '英検準1級のライティングの過去問',
  textEiken2: '英検2級のライティングの過去問',
  textEikenPre2: '英検準2級のライティングの過去問',
};

const firstList = {
  selfIntroduction: '自己紹介',
  hobby: '趣味',
  job: '仕事の紹介',
  study: '外国語を勉強する理由',
  dream: '将来の夢',
  trip: '旅行の思い出',
  reborn: 'もし生まれ変わるなら',
};

const selectTopicSubcategory = {
  headerTitle: 'テーマの選択',
  firstList,
};

const topicGuide = {
  swipeStart: 'スワイプして\nスライドを移動しよう',
  swipeEnd: 'スライドを復習したいときは\nスワイプして戻ろう',
  introduction: 'はじめに',
  guideTipTitle: 'よく使う表現',
  expression: '表現',
  example: '例文',
  word: '単語',
  guideEndText: 'ここでスライドは終わりです。\n実際に文章を書いてみましょう！',
};

const selfIntroduction = {
  introduction:
    '初回は自己紹介について書いてみましょう。自己紹介は新しい人と会ったときは必ずしますよね。\n\n{{learnLanguage}}で一度文章を作成しておくと、実際に話す時、スラスラ話すことができます。',
  expression1: '名前、呼び名',
  expression2: '出身地、育った町',
  expression3: '会社名、職業',
  expression4: '趣味',
  example1: '田中はなといいます。はなと呼んでください。',
  example2: '私は神奈川で生まれて東京で育ちました。',
  example3: '私はLangJournalでマーケティングディレクターとして働いています。',
  example4: '私はギターを弾くのが好きです。',
  wordTitle: '自己紹介で使える表現一覧',
  word1: 'お会いできて嬉しいです。',
  word2: 'XXと呼んでください。',
  word3: '生まれも育ちもXXです。',
  word4: '日本から来ました。',
  word5: '弟がいます。',
  word6: '妻と結婚して5年になります。',
  word7: '大学で心理学を専攻しています。',
  word8: 'XXの業界で働いています。',
  word9: '旅行をするのがとても好きです。',
  word10: 'お会いできてよかったです。',
};

const hobby = {
  introduction:
    '新しい友達ができた時、同僚とお酒を飲む時、趣味について話すことは多くないですか？{{learnLanguage}}も同じです。趣味は定番の話題です。\n\n今日は"あなたの趣味"について話すことができるようしましょう。',
  expression1: '趣味の名前',
  expression2: '趣味の名前、趣味を始めたきっかけ',
  expression3: '今後について',
  example1: '私の趣味はランニングです。',
  example2: '私がランニングを始めたきっかけはフルマラソンに参加したことです。',
  example3: '私は今後もこの運動を続けていきたいです。',
  wordTitle: '趣味一覧',
  word1: '買い物',
  word2: '映画鑑賞',
  word3: '野球',
  word4: '英語学習',
  word5: '生け花',
  word6: 'ウェブサイト運営',
  word7: '旅行',
  word8: '温泉巡り',
  word9: '写真',
};

const job = {
  introduction:
    '３回目のテーマは仕事です。文章を書くことにだいぶ慣れてきたのではないでしょうか?\n\n今日は"あなたが何の仕事をしているのか？"を書けるようにしましょう',
  expression1: '勤務先の名前',
  expression2: '職業',
  expression3: '専門分野',
  example1: '私はLangJournal Centerで仕事をしています。',
  example2: '私の職業は英語の先生です',
  example3: '弊社はマンツーマンレッスンを専門にしています。',
  wordTitle: '職業一覧',
  word1: '弁護士',
  word2: '会計士',
  word3: 'エンジニア',
  word4: '受付',
  word5: '秘書',
  word6: '会社員',
  word7: '製造業者',
  word8: '販売業者',
  word9: '銀行員',
  word10: 'コック・調理師',
  word11: '公務員',
  word12: '先生',
  word13: '医者',
  word14: '薬剤師',
  word15: '看護師',
  word16: '起業家',
  word17: '研究員',
  word18: '作家',
};

const study = {
  introduction:
    'あなたはなぜ{{learnLanguage}}の勉強を始めたのですか?\n\n語学学校や、留学へ行くと必ず聞かれる質問です。理由を{{learnLanguage}}で話せるようにしましょう。',
  expression1: '言語、理由',
  expression2: '言語、理由',
  expression3: '言語、理由',
  example1:
    '英語の勉強を始めた理由は、新しい仕事で顧客と基本的に英語を使わなければならないからです。',
  wordTitle: '理由一覧',
  word1: '趣味や余暇',
  word2: '他の国の人々と出会う',
  word3: '旅行のために英語を学ぶ',
  word4: '外国人と話せるようになる',
  word5: '仕事で昇進する',
  word6: '転職',
  word7: '英語力を生かした仕事に就く',
};

const dream = {
  introduction:
    'あなたは将来何になりたいですか？\n\n今日は将来の夢や目標を書いてみましょう。',
  expression1: '将来の夢',
  expression2: '過去の体験',
  expression3: '夢を通じて実現したい事',
  example1: '私の夢は自分のお店を持つことです。',
  example2: '私は小さいころから料理をすることが好きでした。',
  example3: '多くの人に私の料理を食べて喜んでもらいたいです。',
  wordTitle: '将来の夢の例一覧',
  word1: '小学校の先生になる',
  word2: 'イラストレーターになる',
  word3: 'プロサッカー選手になる',
  word4: '国際的なボランティアに携わる',
  word5: 'サッカー雑誌を制作する人になる',
  word6: 'アフリカで働く',
  word7: '将来グアムに住んで働く',
  word8: '日本一周',
  word9: 'まだ将来の夢がない',
};

const trip = {
  introduction:
    '今回のテーマは旅行です。友人から旅行の話を聞くのは楽しいですよね。\n\nあなたも{{learnLanguage}}で旅行のトークを１つ用意しておきましょう。',
  expression1: '行った国名(都市名)、一緒に行った人',
  expression2: '期間、訪れた場所',
  expression3: '一番の思い出',
  example1: '私はイタリアへ家族と一緒に行きました。',
  example2: '私たちは１０日間でローマとベネチアとナポリを訪れました。',
  example3: '一番の思い出は、青の洞窟へボートで行ったことです。',
  wordTitle: '旅の思い出の表現一覧',
  word1: 'ハイキングをしに中国を訪れました。',
  word2: 'ハワイのビーチに行きました。',
  word3: '韓国で買い物をしました。',
  word4: '地元の料理は本当においしいです。',
  word5: '地元の人がとても親切でした。',
  word6: 'お店でとてもおもしろいグッズを見つけました。',
  word7: 'グレートバリアリーフで有名なケアンズへ行きました。',
  word8: '旅の恥はかき捨て。',
  word9: 'また行けるといいなと思います。',
};

const reborn = {
  introduction:
    'この章の最後のテーマです。"もしXXだったら..."は会話でよく使う表現ですよね。\n\n今日は"もし生まれ変わったら"について書いていきましょう。',
  expression1: '生まれ変わったらやりたいこと',
  expression2: '理由',
  example1: '生まれ変われるなら1945年頃に生まれたいです。',
  example2: 'なぜなら、1960年代の生きた心理学者に学びたいからです。',
  wordTitle: '表現一覧',
  word1: 'もしも私が生まれ変わるなら、鳥になりたい。',
  word2: '自分に生まれ変わりたい。',
  word3: 'もし生まれ変わったら、医者になりたい。',
  word4: 'もし生まれ変わったら、世界一周旅行に挑戦する。',
};

const first = {
  selfIntroduction,
  hobby,
  job,
  study,
  dream,
  trip,
  reborn,
};

const ja = {
  common,
  day,
  shortDay,
  errorMessage,
  mainTab,
  deleteAcount,
  draftDiary,
  editEmail,
  editMyProfile,
  editPassword,
  foregetPassword,
  initialize,
  myDiary,
  myDiaryList,
  viewMyDiary,
  themeCategory,
  myPage,
  onboarding,
  reminderInitial,
  reminderSelectTime,
  reminderSelectDay,
  pushSetting,
  editMyDiaryList,
  postDiary,
  postDraftDiary,
  postReviseDiary,
  registerEmailPassword,
  reviewList,
  selectLanguage,
  selectDiaryType,
  selectTopicSubcategory,
  topicGuide,
  setting,
  signIn,
  signUp,
  userProfile,
  record,
  emptyDiary,
  profileLanguage,
  emptyMyDiaryList,
  modalDeleteAcount,
  modalDiaryCancel,
  modalSendEmail,
  myDiaryListMenu,
  postDiaryComponent,
  sns,
  myDiaryStatus,
  language,
  inquiry,
  first,
  maintenance,
};

export default ja;
