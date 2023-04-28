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
  check: 'Check',
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

// タブ
const mainTab = {
  myDiary: 'My Entries',
  postDiary: Platform.OS === 'web' ? 'Write an Entry' : 'Write',
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

const myDiary = {
  menuDelete: 'Delete',
  confirmMessage: 'Are you sure you want to delete this journal entry?',
  posted: 'Original',
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
  ignore: 'Ignore',
};

const myDiaryList = {
  headerTitle: 'My Entries',
  diaryList: {
    one: 'My Journal Entries: {{count}} entry',
    other: 'My Journal Entries: {{count}} entries',
    zero: 'My Journal Entries',
  },
  notficationSetting:
    'Interchao app notifications are turned off. Let\'s turn on "Notification" from "Settings".',
  emptyDiary: 'No Journal Entries',
  theme: 'Topic',
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

const record = {
  headerTitle: 'Recording',
  confirmMessage: 'Are you sure you want to delete the recording?',
  save: 'Save',
  delete: 'Delete',
  notSave: 'Audio for more than 2 minutes cannot be saved',
};

const firstDiary = {
  first: 'First entry',
};

//  molecules
const emptyDiary = {
  empty: 'You haven’t posted any journal entries.',
};

const profileLanguage = {
  learn: 'Learning',
};

const inquiry = {
  headerTitle: 'Inquiry',
  email: 'Email Address',
  message: 'Message',
  title: 'Thank you for your inquiry.',
  thanks:
    'We will reply to you within a few days. Please kindly wait for a moment.',
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

const modalSendEmail = {
  title: 'Mail Sent',
  text: 'The email has been sent. Please click the link in the email to change your password.',
};

const myDiaryListMenu = {
  myPage: 'My Page',
  draftList: 'List of Drafts',
  reviewList: 'List of Reviews',
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

const myDiaryStatus = {
  draft: 'Draft',
  checked: 'Posted',
  fixed: 'Fixed',
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
  reviewList,
  selectLanguage,
  selectDiaryType,
  selectThemeSubcategory,
  themeGuide,
  setting,
  signIn,
  signUp,
  userProfile,
  record,
  firstDiary,
  emptyDiary,
  profileLanguage,
  emptyMyDiaryList,
  modalAlertCorrection,
  modalAlertPublish,
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
};

export default en;
