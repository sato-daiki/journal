import { Platform } from 'react-native';

// 共通のワード
const common = {
  cancel: 'Cancel',
  close: 'Close',
  confirmation: 'Confirmation',
  error: 'Error',
  done: 'Done',
  edit: 'Edit',
  register: 'Register',
  sending: 'Send',
  next: 'Next',
  check: 'check',
  draft: 'Save',
  skip: 'Skip',
  save: 'Save',
  add: 'Add',
  delete: 'Delete',
  translation: 'Translation',
  speech: 'Speak',
  copy: 'Copy',
  slow: 'Slow',
  back: 'Back',
  begin: 'Begin',
  time: 'Please select a time',
};

const day = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
};

const shortDay = {
  sunday: 'S',
  monday: 'M',
  tuesday: 'T',
  wednesday: 'W',
  thursday: 'T',
  friday: 'F',
  saturday: 'S',
};

// web
const helmet = {
  keyword: 'Japanese, study, correct, free, diary, entry, language exchange',
  description:
    'Interchao is a free, interactive language learning application for Japanese and English learners. Your journal entry will be read and marked by Japanese speakers. Let’s mark English diary as an English teacher as a return!',
  ogTitle: 'Interchao - Japanese learning',
  ogDescription:
    'Interchao is a free, interactive language learning application for Japanese and English learners. Your journal entry will be read and marked by Japanese speakers. Let’s mark English diary as an English teacher as a return!',
};

const web = {
  firstViewTitle: '“Speaking” starts from “Writing”',
  firstViewSubTitle: 'Interactive language learning app',
  firstViewStart: 'Join Interchao today.',
  wahtTitle: 'What is Interchao?',
  wahtText1:
    'Interchao is a free, interactive language learning app for Japanese and English learners.',
  wahtText2:
    'Your journal entry will be read and marked by Japanese speakers. Let’s mark English journal entry as an English teacher as a return!',
  whyTitle: 'Why is it necessary to write?',
  whyText: 'Writing is the optimal language learning method',
  whyCnatText1: '「最近調子はどうですか？」',
  whyCnatText2: '「絶好調です。あなたは？」',
  whyCnatText3:
    '「元気です...(Oh no, I can’t keep the conversation going...)」',
  reasonTitle1: 'You can’t speak more than what you can write',
  reasonText11: 'You can’t talk what you cannot pen down.',
  reasonText12: 'Writing is a training for speaking.',
  reasonTitle2: 'Make your articles checked by Japanese speakers',
  reasonText21:
    'Since you have written down something, you want to know if there were mistakes.',
  reasonText22:
    'Are the words and grammar correct? Are you making sense? Let’s have your articles checked by Japanese speakers!',
  reasonTitle3: 'Write in your own words',
  reasonText31:
    'Textbooks and scripts from movies are sometimes not applicable in our daily life.',
  reasonText32:
    'Through outputting something in your own words, you are able to learn in a practical way.',
  correctTitle: 'Correct entries to get points',
  correctText1:
    'Mark a journal entry in English and get 10 points. Use the points for writing your own journal entry!',
  exampleTitle: 'Example of a Correction',
  exampleText: 'Take a look at an actual example.',
  exampleDetailTitle1: 'Your Journal Entry',
  exampleDetailText1: 'Hurry up and publish an entry.',
  exampleDetailTitle2: 'Correction Results',
  exampleDetailText2: 'The incorrect phrases or areas will be listed here.',
  exampleDetailTitle3: 'General Comments on the Entry',
  exampleDetailText3: '',
  startTitle: 'Start by writing a journal entry for free',
  startText:
    'By registering for a free account, you can receive 30 pts (3 journal entry’s worth). Hurry and write a journal entry so you can have it corrected!',
  operator: 'Operator',
};

const modalAppSuggestion = {
  title: 'Interchao is better on the app',
  text: 'Never miss an correction. Open this in the Interchao app to get the full experience',
};

// タブ
const mainTab = {
  myDiary: 'My Entries',
  postDiary: Platform.OS === 'web' ? 'Write an Entry' : 'Write',
  teachDiary: Platform.OS === 'web' ? 'Entries to Correct' : 'Correct',
  myPage: 'My Page',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: 'There is an error.',
  wrongPassword: 'This password is incorrect.',
  invalidEmail: 'Please enter a valid email address',
  weakPassword: 'Please enter a password with at least 6 digits',
  userNotFound: 'This email address does not exist.',
  emailAlreadyInUse: 'This email address is already registered',
  tooManyRequests:
    'You have made too many failed attempts. Please try again later.',
  network: 'There has been a network error.',
  defaultError: 'There is an error. {{message}}',
  emptyUserName: 'Please enter a username.',
  invalidUserName:
    'Only alphanumeric characters, _ (the underbar), and . (period) can be used.',
  initialUserName: 'The first character must be an alphanumeric character.',
  userNameAlreadyInUse: 'This username has already been taken.',
  notFound: 'This page cannot be opened. There is an error.',
  cantLogout:
    'Because you have not registered an email address, you cannot logout.',
  invalidRaiting: 'Please rate between 1~5.',
  correctionAlready:
    'Someone else has started correcting this entry. Please search for another entry.',
  deleteTargetPage: 'This page cannot be opened.',
  deleteTargetUser: 'This page cannot be opened. The user may have deleted it.',
  emptyTitile: 'There is no title.',
  emptyText: 'There is no text.',
  emptyEmail: 'There is no email address.',
  emptyMessage: 'There is no message.',
  lackPointsTitle: 'You do not have enough points.',
  lackPointsText:
    '{{usePoint}} points are needed to publish an entry with {{textLength}} characters. You can earn more points by correcting entries.',
  exceedingCharacter:
    'Exceeding maximum character count. Maximum number of characters:{{textLength}}',
  video: 'An error occurred during video playback',
};

const app = {
  updateTitle: 'New version is available',
  updateMessage: 'Please update this app to the newest version',
  updateOk: 'Update',
};

// 各画面ごとの文字
const correcting = {
  headerTitle: 'Correct',
  header: 'List of corrections by others',
  deleteAlert:
    'All of your corrections will be deleted. Would you like to proceed?',
  titleDone: 'Publish',
  nothing: 'No fix',
  summary: 'Summary',
};

const deleteAcount = {
  headerTitle: 'About Account Deletion',
  text: 'If you delete your account, all information about the journal entries you published will be deleted and cannot be retrieved. If you would still like to delete your account, please tap the button below.',
  withdrawal: 'Delete Account',
  confirmation: 'Are you sure you want to delete this account?',
};

const draftDiary = {
  headerTitle: 'Drafts',
  diaryList: {
    one: 'List of Drafts: {{count}} entry',
    other: 'List of Drafts: {{count}} entries',
    zero: 'List of Drafts',
  },
  empty: 'You do not have any drafts.',
};

const editEmail = {
  headerTitle: 'Edit Email Address',
  title: 'Please enter a new email address.',
  labelEmail: 'New Email Address',
  labelPassword: 'Current Password',
};

const editMyProfile = {
  headerTitle: 'Edit User',
  name: 'Name',
  userName: 'Username',
  placeholderIntroduction: 'Self Introduction (200 characters or less)',
  learn: 'Leaning',
  native: 'Teaching',
  spoken: 'Other Languages\nyou can speak',
  imageButton: 'Upload an Image',
};

const editPassword = {
  headerTitle: 'Edit Password',
  forgetText: '',
  link: 'Forgot password?',
  currentPassword: 'Current Password',
  newPassword: 'New Password (6 or more characters)',
};

const editUserName = {
  headerTitle: 'Username',
  userName: 'Username',
};

const foregetPassword = {
  headerTitle: 'Change Password',
  email: 'Email',
  title: 'Please enter your email address.',
  subText:
    'We will send a URL to your email address for you to change your password.',
};

const initialize = {
  start: 'Create Account',
  // 末尾にスペースを開ける
  acount: 'Have an account already? ',
  link: 'Login',
};

const inputUserName = {
  headerTitle: 'Username Registration',
  title: 'Please enter your username.',
  subText: 'You can change your username at any time.',
};

const myDiary = {
  menuDelete: 'Delete',
  confirmMessage: 'Are you sure you want to delete this journal entry?',
  posted: 'Posted',
  fairCopy: 'Fair Copy',
  closeAlert:
    'Any edits that have not been saved will be lost. Would you like to exit?',
  permissionAudio:
    'You must enable audio recording permissions in order to use this function',
  voiceTitle: 'Read Out Loud',
  myVoice: 'Listen to Your Recorded Voice',
  machine: "Listen to Machine's Voice",
  record: 'Voice Recording',
  recommend: 'What is an efficient study method?',
};

const myDiaryList = {
  headerTitle: 'My Entries',
  diaryList: {
    one: 'My Journal Entries: {{count}} entry',
    other: 'My Journal Entries: {{count}} entries',
    zero: 'My Journal Entries',
  },
  notficationSetting:
    'Interchao app notifications are turned off. Let\'s turn on "Notification" from "Settings" so that you can check when the journal entries correction arrives.',
  emptyDiary: 'No Journal Entries',
  theme: 'Topic',
};

const myDiarySerch = {
  placeholder: 'Search by title or keywords',
};

const myPage = {
  headerTitle: 'My Page',
  editButton: 'Edit',
  adGetPoints: 'Earn {{points}}P by watching ads',
  timeOut: 'Next video ads {{activeHour}}~',
};

const onboarding = {
  reminderInitial: 'Set study time',
  reminderSelectTime: 'Set study time',
  reminderSelectDay: 'Select days of the week',
  pushSetting: 'Turn on notifications',
};

const reminderInitial = {
  text: "It is important to make studying part of your daily routine. Let's fix the time to study. If you register a reminder, you will be notified at a set time.",
  submit: 'Set Reminder',
};

const reminderSelectTime = {
  title: 'Please set a study schedule',
  fix: 'Same time every day',
  custom: 'Custom',
  studyDay: 'Days of the week',
  time: 'Time',
  start: 'Start time',
  end: 'End time',
  notificationLable: 'Timing of notification',
  notificationStart: 'Notify at the starting time',
  notificationEnd: 'Notify at the ending time',
  notificationStartTitle: 'Study Start Time',
  notificationStartBody: "Let's study hard today as well",
  notificationEndTitle: 'Study End Time',
  notificationEndBody: 'Great work!',
  notficationAlert:
    'The reminder function does not work because the notification setting is off. Turn on Interchao notifications from your device settings.',
};

const reminderSelectDay = {
  title: 'Please select days of the week to study',
};

const pushSetting = {
  title: 'Turn On Notifications',
  description: 'You will be notified when the reminder time is reached.',
  submit: 'Turn On',
};

const editMyDiaryList = {
  headerTitle: 'Edit Journal Entries',
};

const postDiary = {
  headerTitle: 'New Journal Entry',
};

const postDraftDiary = {
  headerTitle: 'Edit Your Draft',
};

const registerEmailPassword = {
  headerTitle: 'Register Email and Password',
  title: 'Please enter your email address and password',
  subText:
    'You will need this data when switching devices. You can also register at a later time.',
  email: 'Email Address',
  password: 'Password (6 or more characters)',
};

const reviewList = {
  headerTitle: 'List of Reviews',
  reviewList: 'List of Reviews',
};

const review = {
  headerTitle: 'Review',
  placeholder: 'Comment (Optional)',
  confirmation:
    'The draft of your review will be deleted. Would you like to proceed?',
};

const selectLanguage = {
  headerTitle: 'Language Selection',
  title: 'Please Choose a language to learn.',
};

const setting = {
  headerTitle: 'Settings',
  title: 'Basic',
  reminder: 'Reminder',
  notice: 'Notifications',
  editEmail: 'Edit Email Address',
  editPassword: 'Edit Password',
  registerEmailPassword: 'Register Email and Password',
  tutorial: 'Tutorial',
  deleteAcount: 'About Account Deletion',
  logout: 'Logout',
  inquiry: 'Contact',
  about: 'What is Interchao',
};

const signIn = {
  headerTitle: 'Login',
  email: 'Email Address',
  password: 'Password',
  login: 'Login',
  forgetText: '',
  link: 'Forgot password?',
};

const signUp = {
  headerTitle: 'Email Registration',
  title: 'Please enter your email address and password.',
  subText:
    'You will need this data when switching devices. You can also register at a later time.',
  email: 'Email Address',
  password: 'Password (6 or more characters)',
};

const teachDiary = {
  headerTitle: 'Entry',
  start: 'Begin Corrections',
};

const teachDiaryList = {
  headerTitle: 'Entries',
  searchText: 'Search Entries',
  diaryList: 'List of Entries in Languages ​​You Can Speak',
  empty: 'There are no entries from other people.',
};

const teachDiarySerch = {
  searchBar: 'Search by title or keywords',
};

const tutorialList = {
  headerTitle: 'List of Tutorials',
  postDiary: 'How to Write Entries',
  points: 'About Points',
};

const notFound = {
  text: 'The page you are looking for is not found',
  link: 'Top',
};

const record = {
  headerTitle: 'Recording',
  confirmMessage: 'Are you sure you want to delete the recording?',
  save: 'Save',
  delete: 'Delete',
  notSave: 'Audio for more than 2 minutes cannot be saved',
};

const userProfile = {
  headerTitle: 'User',
  moreRead: 'View All {{count}} Reviews',
  blocked: 'Block',
  unBlocked: 'Unblock',
  report: 'Report',
  diaryList: {
    one: '{{count}} Journal Entry',
    other: '{{count}} Journal Entries',
    zero: 'Journal Entries',
  },
  topReview: 'Top Reviews',
};

// atoms
const commentCard = {
  original: 'Original',
  fix: 'Edit',
  detail: 'Comment',
  optional: 'Optional',
};

const firstDiary = {
  first: 'First entry',
};

const userPoints = {
  points: 'Points',
};

const userPointsBig = {
  points: 'Current Points',
};

//  molecules
const emptyDiary = {
  empty: 'You haven’t posted any journal entries.',
};

const emptyReview = {
  empty: 'There are no reviews yet.',
};

const myDiaryCorrectionFooter = {
  finText: 'This journal entry has been reviewed.',
  title: 'Review the Correction',
  promptText: 'Please leave a thank you and your appraisal of the correction.',
};

const profileLanguage = {
  learn: 'Learning',
  native: 'Teaching',
  spoken: 'Other Teaching',
};

const profileNationality = {
  nationality: 'Nationality',
};

const inquiry = {
  headerTitle: 'Inquiry',
  email: 'Email Address',
  message: 'Message',
  title: 'Thank you for your inquiry.',
  thanks:
    'We will reply to you within a few days. Please kindly wait for a moment.',
};

// organisms
const diaryHitList = {
  empty: 'No journal entries matched your search.',
  header: 'Search Results',
};

const emptyMyDiaryList = {
  text: 'You haven’t posted any journal entries.\nWrite an entry and have Japanese correct it!',
  hint: 'Start here!\nYour entry will be\nproofread for free!',
};

const modalAlertCorrection = {
  text1: 'Please write all of the corrections in ',
  text2:
    '.\n\nPlease finish making corrections within 30 minutes. Your corrections will be discarded if you take longer than 30 minutes.\n\nOnce you start, the entry will be locked and other people will be unable to make corrections.',
  start: 'Begin Corrections',
};

const modalAlertPublish = {
  confirmation:
    'It will cost {{usePoints}} points to publish this entry. Once an entry has been published, it cannot be edited. Would you like to proceed?',
  submit: 'Publish',
  publish: 'The journal entry has been published',
  share: "Let's tell everyone the published journal entry",
  first: "Thank you for your first post. Let's do our best tomorrow too.",
  runningDays: "It's a diary post for {{runningDays}} consecutive days. Great!",
  runningWeeks:
    "It's a diary post for {{runningWeeks}} consecutive weeks! Let's keep doing our best.",
  good: "Thank you for posting.\nLet's do your best tomorrow too",
};

const modalBlock = {
  blockedQuestion: 'Block {{userName}}?',
  blockedSuccess: '{{userName}} Blocked',
  unblockedQuestion: 'Unblock {{userName}}?',
  unblockedSuccess: '{{userName}} Unblocked',
  blockedMessage:
    "They won't be able to find your user or journal entries on Interchao. Interchao won't let them know you blocked them",
  unblockedMessage:
    "They will now be able to see your user or journal entries on Interchao. Interchao won't let them know you unblocked them.",
  blockedButton: 'Block',
  unblockedButton: 'Unblock',
  blockedEndMessage: 'You can unblock them anytime from their user.',
  unblockedEndMessage: 'You can block them anytime from their user.',
};

const modalAdPointsGet = {
  title: 'Earn points',
  text: 'Thank you for watching the video. Earn {{getPoints}} points.',
};

const modalCorrectingDone = {
  title: 'Complete Corrections',
  text: 'Thank you for correcting the entry. You have received {{getPoints}} points.',
};

const modalDeleteAcount = {
  title: 'Delete Account',
  text: 'Please enter your password and tap the “Delete Account” button.',
  button: 'Delete Account',
};

const modalDiaryCancel = {
  message:
    'Any edits that have not been saved will be lost. Would you like to exit?',
  button: 'Save as a Draft',
};

const modalLackPoint = {
  title: 'Not Enough Points',
  text: 'You don’t have enough points! 10 points are needed to publish an entry {{learnCharacters}} characters long. \n\nYou can earn 10 points by correcting a journal entry or watching video ads.\n\nDrafts can be saved without needing to use points.',
  submit: 'Continue',
  close: 'Look for Entries to Correct',
  watchAd: 'Watch video ads',
};

const modalSendEmail = {
  title: 'Mail Sent',
  text: 'The email has been sent. Please click the link in the email to change your password.',
};

const modalStillCorrecting = {
  text: 'Your corrections have been interrupted.',
};

const modalTimeUp = {
  title: 'Time Up',
  text: '30 minutes have passed, so the lock on corrections will be removed.',
};

const myDiaryCorrection = {
  header: 'Correction Results',
  hide: 'Hide',
  show: 'Show',
};

const myDiaryListMenu = {
  myPage: 'My Page',
  draftList: 'List of Drafts',
  reviewList: 'List of Reviews',
};

const report = {
  title: 'Report',
  subTitle: 'Why are you reporting this account?',
  description:
    "We won't let them know if you take any of these actions. If someone is in immediate danger, call local emergency services. Don't wait.",
  spam: "It's spam",
  inappropriate: "It's inappropriate",
  reportedTitle: 'Thanks for letting us know',
  reportedDescription:
    'Your feedback is important in helping us keep the Interchao community safe.',
};

const postDiaryComponent = {
  usePoints: 'Points Needed',
  textLength: 'Characters',
  points: 'Your Points',
  textPlaceholder: 'Entry',
  draft: 'Save as Draft',
  hint: 'Review the slides',
};

const sns = {
  app: 'Share the app on SNS',
  diary: 'Share your entry on SNS',
};

const teachDiaryCorrection = {
  header: 'Correction Results',
};

const tutorialPoints = {
  title: 'About Points',
  buttonText: 'Begin',
  text: 'A minimum of 10 points is needed to publish a journal entry. You can get 10+ points by making corrections. The number of points used and received is based on the language and character count.',
};

const tutorialTeachDiaryList = {
  title: 'What is “Entries to Correct”?',
  buttonText: 'Begin',
  text1:
    'This is a list of journal entries in the languages ​​you can speak. \n\nUp to 3 people can be corrected per journal entry. Please give priority to the journal entry whose status is ',
  text2: '. If you correct it, you will get 10 points.',
  // Not Yet Correctedはスペースを開けておく
  textMainColor: ' Not Yet Corrected',
};

// util
const cameraRoll = {
  permitTitle: 'Access permission is needed.',
  permitMessage:
    'You must give Interchao permission to access your photo library.',
  permitHowTo: 'How to Change Settings',
};

const myDiaryStatus = {
  draft: 'Draft',
  checked: 'Posted',
  fixed: 'Fixed',
};

const userDiaryStatus = {
  yet: 'Not Yet Corrected',
  correcting: 'Being Corrected',
  done: '{{correctedNum}}/3 Corrected',
};

const language = {
  en: 'English',
  de: 'German	',
  es: 'Spanish',
  fr: 'French	',
  pt: 'Portugues	',
  nl: 'Dutch	',
};

const selectDiaryType = {
  headerTitle: 'Type Selection',
  recommend: 'Recommend',
  titleFree: 'Topic of your choice',
  titleTheme: 'Choose from topics',
  textFree:
    "Diary, things you couldn't talk about today, favorite movies, etc. Write about the topic of your choice.",
  textTheme:
    "Write sentences according to topics. Recommended if you can't think of what to write.",
};

const firstList = {
  selfIntroduction: 'Self-Introduction',
  hobby: 'Hobby',
  job: 'Job',
  study: 'Reasons to study a foreign language',
  dream: 'Dream for the future',
  trip: 'Travel memories',
  reborn: 'If you were born again',
};

const selectThemeSubcategory = {
  headerTitle: 'Theme Selection',
  firstList,
};

const themeGuide = {
  swipeStart: 'Swipe to move slides',
  swipeEnd: 'Swipe back \nwhen you want to\nreview the slides',
  introduction: 'Introduction',
  guideTipTitle: 'Useful Expressions',
  expression: 'Expressions',
  example: 'Example sentences',
  word: 'Words',
  guideEndText:
    "This is the end of the slide.\nLet's actually write a sentence!",
};

const selfIntroduction = {
  introduction:
    "First, let's start by writing a self introduction. Don't forget to introduce yourself when meeting someone new.\n\nOnce you write a sentence with {{learnLanguage}}, you'll be able to talk smoothly when you're talking in practice.",
  expression1: 'name, nickname',
  expression2: 'birthplace, the town where you grew up',
  expression3: 'company name, occupation',
  expression4: 'hobby',
  example1: 'My name is Hana Tanaka. Please call me Hana.',
  example2: 'I was born in Kanagawa but grew up in Tokyo.',
  example3: 'I work for Interchao as a marketing director.',
  example4: 'I like playing the guitar.',
  wordTitle: 'List of expressions',
  word1: 'It’s a pleasure to meet you.',
  word2: 'You can call me XX.',
  word3: 'I was born and raised in XX.',
  word4: 'I come from Japan.',
  word5: 'I have a younger brother.',
  word6: 'My wife and I have been married for 5 years.',
  word7: 'I am a university student studying psychology.',
  word8: 'I work in the XX industry.',
  word9: 'I love to travel.',
  word10: 'It was nice meeting you.',
};

const hobby = {
  introduction:
    "When you made a new friend, when drinking with your colleagues, you often talk about your hobbies, don't you? {{learnLanguage}} is the same.\n\nHobbies are staple discussion topic. Today, let's learn how to talk about your hobbies.",
  expression1: 'hobby name',
  expression2: 'hobby name, How did you start your hobby?',
  expression3: 'about the future',
  example1: 'My hobby is running.',
  example2:
    'The reason I started running was that I participated in a full Marathon.',
  example3: 'I want to continue with this kind of exercise.',
  wordTitle: 'Hobby list',
  word1: 'shopping',
  word2: 'watching movies',
  word3: 'baseball',
  word4: 'studying English',
  word5: 'flower arrangement',
  word6: 'run my own website',
  word7: 'traveling',
  word8: 'visiting hot springs',
  word9: 'taking pictures',
};

const job = {
  introduction:
    "The third day's theme is work. You've gotten used to writing sentences, haven't you?\n\nToday, let's write about what you do for work.",
  expression1: 'name of the business',
  expression2: 'profession',
  expression3: 'specialized field',
  example1: 'I work for Interchao Center.',
  example2: 'My profession is an English teacher.',
  example3: 'Our company specializes in private lessons.',
  wordTitle: 'Occupation list',
  word1: 'lawyer',
  word2: 'accountant',
  word3: 'engineer',
  word4: 'receptionist',
  word5: 'secretary',
  word6: 'office worker',
  word7: 'manufacturer',
  word8: 'seller/supplier/dealer',
  word9: 'bank clerk',
  word10: 'chef',
  word11: 'public worker',
  word12: 'teacher',
  word13: 'doctor',
  word14: 'pharmacist',
  word15: 'nurse',
  word16: 'entrepreneur',
  word17: 'researcher',
  word18: 'author/writer',
};

const study = {
  introduction:
    "Why did you begin studying {{learnLanguage}}?\n\nThis is a question that will definitely be asked in language schools or when you go studying abroad. Let's learn to explain the reason in {{learnLanguage}}.",
  expression1: 'language, reason',
  expression2: 'language, reason',
  expression3: 'language, reason',
  example1:
    'My reason for studying English is that in my new job, I have to use English regularly with clients.',

  wordTitle: 'List of reasons',
  word1: 'a hobby or pastime',
  word2: 'to meet people from other countries',
  word3: 'to learn English for travel',
  word4: 'to be able to speak to foreigners',
  word5: 'to get promoted at work',
  word6: 'to  change jobs',
  word7: 'to find a job where I can use my English skills',
};

const dream = {
  introduction:
    "What do you want to be in the future?\n\nToday, let's talk about your future dreams and goals.",
  expression1: 'dream for the future',
  expression2: 'past experience',
  expression3: 'what you want to achieve through your dreams',
  example1: 'My dream for the future is to have my own shop.',
  example2: 'I loved to cook dishes since I was a child.',
  example3: "I'd like many people to eat my cooking and feel happy.",
  wordTitle: 'List of examples of future dreams',
  word1: 'to be an elementary school teacher',
  word2: 'to be an illustrator',
  word3: 'to be a professional soccer player',
  word4: 'to work in a job related to international volunteering',
  word5: 'to become someone who produces soccer magazines',
  word6: 'to work in Africa',
  word7: 'to live and work in Guam in the future',
  word8: 'to go all over Japan',
  word9: "I still don't have any dreams for the future.",
};

const trip = {
  introduction:
    "Today's theme is travel. It's fun listening to travel stories from a friend, isn't it?\n\nLet's prepare a talk about travel in {{learnLanguage}} for you, too.",
  expression1: 'country name (city name) / person who went with',
  expression2: 'place and period of visit',
  expression3: 'the best memory',
  example1: 'I went to Italy with my family.',
  example2: 'We visited Roma, Venice, and Naples in 10days.',
  example3: 'My favorite memory is that we went to the Blue Grotto by boat.',

  wordTitle: 'List of expressions of memories of the trip',
  word1: 'I visited China to go hiking.',
  word2: 'I went to the beach in Hawaii.',
  word3: 'I went shopping in Korea.',
  word4: 'Local food is really good.',
  word5: 'The locals were very nice.',
  word6: 'We found very interesting goods in a shop.',
  word7: 'I went to Cairns which is famous for the Great Barrier Reef.',
  word8: 'Once over the border, one may do anything.',
  word9: 'I hope I can visit there again.',
};

const reborn = {
  introduction:
    'This is the last theme of this chapter. "If I were XX..." is an expression that\'s often used in conversations.\n\nLet\'s write about what you want to be if you were reborn.',
  expression1: 'what you want to do when you are reborn',
  expression2: 'reason',
  example1: "If I were born, I'd like to be born around 1945.",
  example2: "Because I'd like to learn real physiotherapy in the 1960s.",
  wordTitle: 'List of expressions',
  word1: 'If I were to be reborn, I would like to be a bird.',
  word2: 'I would want to be reborn as myself.',
  word3: 'If I were to be born again, I would like to be a doctor.',
  word4: 'If I were reborn, I would challenge a trip around the world.',
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

const en = {
  common,
  day,
  shortDay,
  web,
  helmet,
  modalAppSuggestion,
  errorMessage,
  mainTab,
  app,
  correcting,
  deleteAcount,
  draftDiary,
  editEmail,
  editMyProfile,
  editPassword,
  editUserName,
  foregetPassword,
  initialize,
  inputUserName,
  myDiary,
  myDiaryList,
  myDiarySerch,
  myPage,
  onboarding,
  reminderInitial,
  reminderSelectTime,
  reminderSelectDay,
  pushSetting,
  editMyDiaryList,
  postDiary,
  postDraftDiary,
  registerEmailPassword,
  review,
  reviewList,
  selectLanguage,
  selectDiaryType,
  selectThemeSubcategory,
  themeGuide,
  setting,
  signIn,
  signUp,
  teachDiary,
  teachDiaryList,
  teachDiarySerch,
  tutorialList,
  userProfile,
  notFound,
  record,
  commentCard,
  firstDiary,
  userPoints,
  userPointsBig,
  emptyDiary,
  emptyReview,
  myDiaryCorrectionFooter,
  profileLanguage,
  profileNationality,
  diaryHitList,
  emptyMyDiaryList,
  modalAlertCorrection,
  modalAlertPublish,
  modalBlock,
  modalAdPointsGet,
  modalCorrectingDone,
  modalDeleteAcount,
  modalDiaryCancel,
  modalLackPoint,
  modalSendEmail,
  modalStillCorrecting,
  modalTimeUp,
  myDiaryCorrection,
  myDiaryListMenu,
  report,
  postDiaryComponent,
  sns,
  teachDiaryCorrection,
  tutorialPoints,
  tutorialTeachDiaryList,
  cameraRoll,
  myDiaryStatus,
  userDiaryStatus,
  language,
  inquiry,
  first,
};

export default en;
