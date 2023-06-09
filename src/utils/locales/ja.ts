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
  skip: 'スキップ',
  save: '保存',
  delete: '削除',
  slow: '遅く',
  back: '戻る',
  begin: 'はじめる',
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

const mainTab = {
  myDiary: 'マイ日記',
  postDiary: '日記を書く',
  setting: '設定',
};

const errorMessage = {
  wrongPassword: 'パスワードが違います',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  weakPassword: 'パスワードは6桁以上で入力してください',
  userNotFound: 'メールアドレスが存在しません',
  emailAlreadyInUse: 'このメールアドレスはすでに登録されています',
  tooManyRequests:
    'エラーの数が一定数を超えました。時間をおいてから再度お試しください',
  network: '通信エラーが発生しました。時間をおいて再度お試し下さい。',
  defaultError: 'エラーが発生しました。{{message}}',
  cantLogout: 'メールアドレスが登録されていないため、ログアウトできません。',
  emptyTitile: 'Titleが入力されていません',
  emptyText: '本文が入力されていません',
  emptyEmail: 'メールアドレスが入力されていません',
  emptyMessage: 'メッセージが入力されていません',
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

const editEmail = {
  headerTitle: 'メールアドレス変更',
  title: '新しいメールアドレスを入力してください',
  labelEmail: '新しいメールアドレス',
  labelPassword: '現在のパスワード',
};

const editMyProfile = {
  headerTitle: 'プロフィール変更',
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
  original: '原文の添削結果',
  revised: '修正後の添削結果',
  ai1: '1st AI',
  ai2: '2nd AI',
  ai3: '3rd AI',
  human: '人間',
  closeAlert: '保存されていない変更は失われます。閉じてよろしいですか？',
  permissionAudio:
    'マイクの権限がないため、起動できません。設定画面からマイクの設定をONにしてください',
  voiceTitle: '音読トレーニング',
  myVoice: '自分の音声を聞く',
  record: '録音する',
  start: '最初から',
  revise: '添削結果を元に修正する',
  check: 'AI②でも添削する',
  adReward: '動画広告を見てAI②でも添削する',
  copiedTitle: 'タイトルをコピーしました',
  copiedText: '本文をコピーしました',
  copied: 'テキストをコピーしました',
  adRewardError: '動画再生においてエラーが発生しました。添削を終了します',
  adLoading: '広告を読み込んでいます',
  become: 'プレミアム会員になる',
  describeAi1: 'この添削は',
  describeAi2: 'で行われています',
  perfect: '修正点はありませんでした',
};

const noAi = {
  premiumText: 'プレミアム会員は{{aiName}}でも添削を行えます',
  text: '15~30秒の動画広告を見ることで、言語チェックAI「{{aiName}}」でも添削を行えます。\nまたは、プレミアム会員になることで、動画の視聴なしで添削が行えます。',
  inactive:
    '※ 現在問題が発生しており、一時的に{{aiName}}でのチェックは停止しております。',
  moreAi: '{{aiName}}について詳しくみる',
  check: '添削する',
  watch: '動画を見て添削する',
};

const noHuman = {
  noHuman: `AIのチェックだけでは不安。直接"人"にチェックしてもらいたい！そんな人におすすなサービスです。1文字あたり2円で添削をします。`,
  noHumanInactive:
    '※ 現在一時的にプロフェッショナルによる人の添削を停止しています。',
  noHumanButton: '添削を依頼する',
  initialLoadError:
    '支払いの読み込み処理で失敗しました。再度このページをロードしてください。',
  noEmail:
    '翻訳依頼をする場合は、メールアドレスとパスワードの登録が必要です。「マイページ」「設定」から登録してください。',
  labelAmount: '料金',
  labelAmountPerLength: '1文字あたりの料金',
  unitYen: '円',
  labelLength: '文字数',
  unitLength: '文字',
  labelSum: '合計',
  describe:
    '※最低料金は{{minimumPrice}}円のため、{{minimumLength}}文字以下でも上記の料金になります。',
  error:
    '支払いプロセスでエラーが発生しました。再度時間を置いてから試してください。',
};

const yetHuman = {
  text: '現在添削中です。{{days}}営業日以内に添削をします。添削が完了したら、登録しているメールアドレスにメールが届きます。',
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

const becomePremium = {
  headerTitle: 'Premium会員について',
  becomeTitle: 'プレミアム会員になる',
  props1: '動画広告の視聴なしで添削ができます',
  props1description: '※1日最大10回まで',
  props2: '広告が非表示になります',
  MONTHLY: 'プレミアム会員(月払い)',
  ANNUAL: 'プレミアム会員(年払い)',
  purchase: '購入',
  restore: '購入情報の復元',
  error: '購入に失敗しました',
  noEmail:
    'プレミアム会員になるには、メールアドレスとパスワードの登録が必要です。「マイページ」「設定」から登録してください。',
};

const passcodeLock = {
  headerTitle: 'パスコード設定',
  input: 'パスコードを入力',
  reInput: 'パスコードを再入力',
  alertBiometric: '生体認証を利用しますか？',
  alertBiometricOk: '利用する',
  alertBiometricNo: '利用しない',
  messageRePasscode:
    '入力されたパスコードは一致しません\nもう一度お試しください',
  errorForceLock:
    '連続でパスコードを間違えたため、強制ロックがかかりました。{{hours}}時間後、再度試してください。',
  errorMultiple: 'あと{{num}}回間違えると強制ロックがかかります。',
  errorSet:
    'パスコードロックの登録に失敗しました。時間を置いて再度試してください。',
  errorRemove:
    'パスコードロックの解除に失敗しました。時間を置いて再度試してください。',
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
  errorPermissionTitle: '権限がありません',
  errorPermissionText:
    'カメラの権限がないため起動できません。端末の設定画面より、LangJourunalにカメラの権限を与えてください。',
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

const selectLanguage = {
  headerTitle: '言語の選択',
  title: '学習する言語を選択してください',
};

const setting = {
  headerTitle: '設定',
  status: '会員ステータス',
  premium: 'プレミアム会員',
  aboutPremium: 'プレミアム会員について',
  basic: '基本設定',
  display: '画面表示',
  darkMode: 'ダークモード',
  fontSize: '文字サイズ',
  app: 'アプリについて',
  learn: '勉強中の言語',
  passcodeLock: 'パスコード設定',
  reminder: 'リマインダー',
  editEmail: 'メールアドレスの変更',
  editPassword: 'パスワードの変更',
  registerEmailPassword: 'メールアドレス/パスワードの登録',
  deleteAcount: '退会について',
  logout: 'ログアウト',
  inquiry: 'お問い合わせ',
  about: 'LangJournalとは',
  cancel: 'プレミアム会員のキャンセルについて',
};

const display = {
  headerTitle: '画面設定',
  device: '端末の設定を使う',
  light: 'ライトモード',
  dark: 'ダークモード',
};

const fontSize = {
  headerTitle: '文字サイズ',
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
  without: 'メールアドレスの登録なしで始める',
  agree1: 'サービスを始めるには',
  terms: '利用規約',
  agree2: 'と',
  privacy: 'プライバシーポリシー',
  agree3: 'に同意する必要があります',
};

const record = {
  headerTitle: '録音',
  confirmMessage: '削除してよろしいでしょうか？',
  save: '保存する',
  delete: '削除する',
  notSave: '2分以上の音声は保存できません',
};

//  molecules
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

const postDiaryComponent = {
  titleLength: 'Title',
  textLength: '本文',
  draft: '下書き保存',
  hint: 'スライドをみる',
  correct: '以前の添削結果を見る',
};

const myDiaryStatus = {
  draft: '下書き',
  checked: '添削完了',
  revised: '修正済',
  yet: '添削待ち',
  unread: '未読',
  done: '完了',
};

const maintenance = {
  defaultMessage:
    '現在メンテナンス中です。\nご不便をおかけして申し訳ございません。\nしばらくお時間が経ってから\n再度ご利用ください',
};

const selectDiaryType = {
  headerTitle: '型の選択',
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
  becomePremium,
  day,
  shortDay,
  errorMessage,
  mainTab,
  deleteAcount,
  editEmail,
  editMyProfile,
  editPassword,
  foregetPassword,
  initialize,
  myDiary,
  noAi,
  myDiaryList,
  noHuman,
  yetHuman,
  viewMyDiary,
  themeCategory,
  passcodeLock,
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
  selectLanguage,
  selectDiaryType,
  selectTopicSubcategory,
  topicGuide,
  setting,
  display,
  fontSize,
  signIn,
  signUp,
  record,
  emptyMyDiaryList,
  modalDeleteAcount,
  modalDiaryCancel,
  modalSendEmail,
  postDiaryComponent,
  myDiaryStatus,
  inquiry,
  first,
  maintenance,
};

export default ja;
