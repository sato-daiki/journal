import { StyleText } from '@/components/organisms/ThemeGuide';

export const jaSelfIntroductionExpressions = [
  '私の名前は__です。__とよんでください。',
  '私は__で生まれて、__で育ちました。',
  '私は__で__として働いています。',
  '私は__が好きです。',
];

export const jaSelfIntroductionExamples = [
  [
    { key: 'a', text: '私の名前は', styleType: 'bold' },
    { key: 'b', text: '田中はな', styleType: 'p' },
    { key: 'c', text: 'です。', styleType: 'bold' },
    { key: 'd', text: 'はな', styleType: 'p' },
    { key: 'e', text: 'とよんでください。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '私は', styleType: 'bold' },
    { key: 'b', text: '神奈川', styleType: 'p' },
    { key: 'c', text: 'で生まれて', styleType: 'bold' },
    { key: 'd', text: '東京', styleType: 'p' },
    { key: 'e', text: 'で育ちました。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '私は', styleType: 'bold' },
    { key: 'b', text: 'インターチャオ', styleType: 'p' },
    { key: 'c', text: 'で', styleType: 'bold' },
    { key: 'd', text: 'マーケティングディレクター', styleType: 'p' },
    { key: 'e', text: 'として働いています。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '私は', styleType: 'bold' },
    { key: 'b', text: 'ギターを弾くの', styleType: 'p' },
    { key: 'c', text: 'が好きです。', styleType: 'bold' },
  ],
] as StyleText[][];

export const jaHobbyExpressions = [
  '私の趣味は__',
  '私が__を始めたきっかけは__',
  '私は__したいです。',
];

export const jaHobbyExamples = [
  [
    { key: 'a', text: '私の趣味は', styleType: 'bold' },
    { key: 'b', text: 'ランニングです。', styleType: 'p' },
  ],
  [
    { key: 'a', text: '私が', styleType: 'bold' },
    { key: 'b', text: 'ランニング', styleType: 'p' },
    { key: 'c', text: 'を始めたきっかけは', styleType: 'bold' },
    {
      key: 'd',
      text: 'フルマラソンに参加したことです。',
      styleType: 'p',
    },
  ],
  [
    { key: 'a', text: '私は', styleType: 'bold' },
    { key: 'b', text: '今後もこの運動を続けて', styleType: 'p' },
    { key: 'c', text: 'いきたいです。', styleType: 'bold' },
  ],
] as StyleText[][];

export const jaJobExpressions = [
  '私は__で仕事をしています。',
  '私の職業は__です。',
  '弊社は__を専門にしています。',
];

export const jaJobExamples = [
  [
    { key: 'a', text: '私は', styleType: 'bold' },
    { key: 'b', text: 'Interchao Center', styleType: 'p' },
    { key: 'c', text: 'で仕事をしています。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '私の職業は', styleType: 'bold' },
    { key: 'b', text: '英語の先生', styleType: 'p' },
    { key: 'c', text: 'です。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '弊社は', styleType: 'bold' },
    { key: 'b', text: 'マンツーマンレッスン', styleType: 'p' },
    { key: 'c', text: 'を専門にしています。', styleType: 'bold' },
  ],
] as StyleText[][];

export const jaStudyExpressions = [
  '私が__の勉強を始めた理由は__',
  'なぜ__の勉強を始めたかというと__',
  '__の勉強を始めたきっかけは__',
];

export const jaStudyExamples = [
  [
    {
      key: 'a',
      text: '私が',
      styleType: 'bold',
    },
    { key: 'b', text: '英語', styleType: 'p' },
    { key: 'c', text: 'の勉強を始めた理由は、', styleType: 'bold' },
    {
      key: 'd',
      text: '新しい仕事で顧客と基本的に英語を使わなければならないからです。',
      styleType: 'p',
    },
  ],
] as StyleText[][];

export const jaDreamExpressions = [
  '私の夢は__',
  '私は小さいころから__',
  '__もらいたいです。',
];

export const jaDreamExamples = [
  [
    { key: 'a', text: '私の夢は', styleType: 'bold' },
    { key: 'b', text: '自分のお店を持つことです。', styleType: 'p' },
  ],
  [
    { key: 'a', text: '私は小さいころから', styleType: 'bold' },
    { key: 'b', text: '料理をすることが好きでした。', styleType: 'p' },
  ],
  [
    {
      key: 'a',
      text: '多くの人に私の料理を食べて喜んで',
      styleType: 'p',
    },
    { key: 'b', text: 'もらいたいです。', styleType: 'bold' },
  ],
] as StyleText[][];

export const jaTripExpressions = [
  '私は__へ__と一緒に行きました。',
  '私たちは__日間で__を訪れました。',
  '一番の思い出は、__',
];

export const jaTripExamples = [
  [
    { key: 'a', text: '私は', styleType: 'bold' },
    { key: 'b', text: 'イタリア', styleType: 'p' },
    { key: 'c', text: 'へ', styleType: 'bold' },
    { key: 'd', text: '家族', styleType: 'p' },
    { key: 'e', text: 'と一緒に行きました', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '私たちは', styleType: 'bold' },
    { key: 'b', text: '１０', styleType: 'p' },
    { key: 'c', text: '日間で', styleType: 'bold' },
    { key: 'd', text: 'ローマとベネチアとナポリ', styleType: 'p' },
    { key: 'e', text: 'を訪れました。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '一番の思い出は、', styleType: 'bold' },
    {
      key: 'b',
      text: '青の洞窟へボートで行ったことです。',
      styleType: 'p',
    },
  ],
] as StyleText[][];

export const jaRebornExpressions = [
  '生まれ変われるなら、__したいです。',
  'なぜなら__たいからです。',
];

export const jaRebornExamples = [
  [
    { key: 'a', text: '生まれ変われるなら', styleType: 'bold' },
    { key: 'b', text: '1945年頃に生まれ', styleType: 'p' },
    { key: 'c', text: 'たいです。', styleType: 'bold' },
  ],
  [
    { key: 'a', text: 'なぜなら、', styleType: 'bold' },
    {
      key: 'b',
      text: '1960年代の生きた心理学者に学び',
      styleType: 'p',
    },
    { key: 'c', text: 'たいからです。', styleType: 'bold' },
  ],
] as StyleText[][];
