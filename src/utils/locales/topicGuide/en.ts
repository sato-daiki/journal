import { StyleText } from '@/components/organisms/TopicGuide';

export const enSelfIntroductionExpressions = [
  'My name is __. Please call me __.',
  'I was born in __ but grew up in __.',
  'I work for __ as a __.',
  'I like __.',
];

export const enSelfIntroductionExamples = [
  [
    { key: 'a', text: 'My name is ', styleType: 'bold' },
    { key: 'b', text: 'Hana Tanaka. ', styleType: 'p' },
    { key: 'c', text: 'Please call me ', styleType: 'bold' },
    { key: 'd', text: 'Hana.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'I was born in ', styleType: 'bold' },
    {
      key: 'b',
      text: 'Kanagawa ',
      styleType: 'p',
    },
    {
      key: 'c',
      text: 'but grew up in ',
      styleType: 'bold',
    },
    {
      key: 'd',
      text: 'Tokyo.',
      styleType: 'p',
    },
  ],
  [
    { key: 'a', text: 'I work for ', styleType: 'bold' },
    { key: 'b', text: 'Interchao ', styleType: 'p' },
    { key: 'c', text: 'as a ', styleType: 'bold' },
    { key: 'd', text: 'marketing director.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'I like ', styleType: 'bold' },
    { key: 'b', text: 'playing the guitar.', styleType: 'p' },
  ],
] as StyleText[][];

export const enHobbyExpressions = [
  'My hobby is __.',
  'The reason I started __ was __.',
  'I want to __.',
];

export const enHobbyExamples = [
  [
    { key: 'a', text: 'My hobby is ', styleType: 'bold' },
    { key: 'b', text: 'running.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'The reason I started ', styleType: 'bold' },
    { key: 'b', text: 'running ', styleType: 'p' },
    { key: 'c', text: 'was ', styleType: 'bold' },
    {
      key: 'd',
      text: 'that I participated in a full Marathon.',
      styleType: 'p',
    },
  ],
  [
    { key: 'a', text: 'I want to ', styleType: 'bold' },
    {
      key: 'b',
      text: 'continue with this kind of exercise.',
      styleType: 'p',
    },
  ],
] as StyleText[][];

export const enJobExpressions = [
  'I work for __.',
  'My profession is __.',
  'Our company specializes in __.',
];

export const enJobExamples = [
  [
    { key: 'a', text: 'I work for ', styleType: 'bold' },
    { key: 'b', text: 'Interchao Center.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'My profession is ', styleType: 'bold' },
    { key: 'b', text: 'an English teacher.', styleType: 'p' },
  ],
  [
    {
      key: 'a',
      text: 'Our company specializes in ',
      styleType: 'bold',
    },
    { key: 'b', text: 'private lessons.', styleType: 'p' },
  ],
] as StyleText[][];

export const enStudyExpressions = [
  'I started learning __ because __.',
  'My reason for studying __ is __.',
  'I am motivated to learn __ because __.',
];

export const enStudyExamples = [
  [
    { key: 'a', text: 'My reason for studying ', styleType: 'bold' },
    { key: 'b', text: 'English ', styleType: 'p' },
    { key: 'c', text: 'is ', styleType: 'bold' },
    {
      key: 'd',
      text: 'that in my new job, I have to use English regularly with clients.',
      styleType: 'p',
    },
  ],
] as StyleText[][];

export const enDreamExpressions = [
  'My dream for the future is __.',
  '__ since I was a child.',
  "I'd like __.",
];

export const enDreamExamples = [
  [
    {
      key: 'a',
      text: 'My dream for the future is ',
      styleType: 'bold',
    },
    { key: 'b', text: 'to have my own shop.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'I loved to cook dishes ', styleType: 'p' },
    {
      key: 'b',
      text: 'since I was a child.',
      styleType: 'bold',
    },
  ],
  [
    { key: 'a', text: "I'd like ", styleType: 'bold' },
    {
      key: 'b',
      text: 'many people to eat my cooking and feel happy.',
      styleType: 'p',
    },
  ],
] as StyleText[][];

export const enTripExpressions = [
  'I went to __ with __.',
  'We visited __ in __days.',
  'My favorite memory is __.',
];

export const enTripExamples = [
  [
    { key: 'a', text: 'I went to ', styleType: 'bold' },
    { key: 'b', text: 'Italy ', styleType: 'p' },
    { key: 'c', text: 'with ', styleType: 'bold' },
    { key: 'd', text: 'my family.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'We visited ', styleType: 'bold' },
    { key: 'b', text: 'Roma, Venice, and Naples ', styleType: 'p' },
    { key: 'c', text: 'in ', styleType: 'bold' },
    { key: 'd', text: '10 days.', styleType: 'p' },
  ],
  [
    { key: 'a', text: 'My favorite memory is ', styleType: 'bold' },
    {
      key: 'b',
      text: 'that we went to the Blue Grotto by boat.',
      styleType: 'p',
    },
  ],
] as StyleText[][];

export const enRebornExpressions = [
  "If I were born again, I'd like to __.",
  "Because I'd like to __.",
];

export const enRebornExamples = [
  [
    {
      key: 'a',
      text: "If I were born, I'd like to ",
      styleType: 'bold',
    },
    {
      key: 'b',
      text: 'born around 1945.',
      styleType: 'p',
    },
  ],
  [
    { key: 'a', text: "Because I'd like to ", styleType: 'bold' },
    {
      key: 'b',
      text: 'learn real physiotherapy in the 1960s.',
      styleType: 'p',
    },
  ],
] as StyleText[][];
