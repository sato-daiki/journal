export interface LanguageInfo {
  name: string;
  code: string;
  detectedLanguage: {
    name: string;
    code: string;
  };
}

export type UnderlineType = 'warning' | 'error';

export const sampleWords: Word[] = [
  {
    text: 'I',
    checked: false,
  },
  {
    text: 'am',
    checked: false,
  },
  {
    text: 'yahoo',
    checked: true,
    checkId: 1,
    underline: 'warning',
    ignore: false,
  },
  {
    text: 'I',
    checked: false,
  },
  {
    text: 'am',
    checked: false,
  },
  {
    text: 'yahoo',
    checked: true,
    checkId: 2,
    underline: 'warning',
    ignore: false,
  },
  {
    text: 'I',
    checked: false,
  },
  {
    text: 'am',
    checked: false,
  },
  {
    text: 'yahoo',
    checked: true,
    checkId: 3,
    underline: 'error',
    ignore: false,
  },
];

export interface Word {
  text: string;
  checked: boolean;
  checkId?: number;
  underline?: UnderlineType;
  ignore?: boolean;
}

export interface Matche {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: [
    {
      value: string;
    },
  ];
  context: {
    text: string;
    offset: number;
    length: number;
  };
  sentence: string;
  rule: {
    id: string;
    subId: string;
    description: string;
    urls: [
      {
        value: string;
      },
    ];
    issueType: string;
    category: {
      id: string;
      name: string;
    };
  };
}

export interface CheckInfo {
  language: LanguageInfo;
  matches: Matche[];
}
