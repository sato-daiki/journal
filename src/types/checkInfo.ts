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
    checkIndex: 0,
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
    checkIndex: 1,
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
    checkIndex: 2,
    underline: 'error',
    ignore: false,
  },
];

export interface Word {
  text: string;
  checked: boolean;
  checkIndex?: number;
  underline?: UnderlineType;
  ignore?: boolean;
}

export interface Match {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: {
    value: string;
    shortDescription?: string;
  }[];
  context: {
    text: string;
    offset: number;
    length: number;
  };
  sentence: string;
  type: {
    typeName: string;
  };
  rule: {
    id: string;
    subId: string;
    sourceFile?: string;
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
    isPremium: boolean;
  };
  ignoreForIncompleteSentence?: boolean;
  contextForSureMatch?: number;
}

export interface CheckInfo {
  language: LanguageInfo;
  matches: Match[];
}
