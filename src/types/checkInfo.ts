export interface LanguageInfo {
  name: string;
  code: string;
  detectedLanguage: {
    name: string;
    code: string;
  };
}

export type UnderlineType = 'warning' | 'error';

export const sampleMatches: Match[] = [
  {
    message: 'Possible missing comma found.',
    shortMessage: 'Missing comma',
    replacements: [
      {
        value: 'exists,',
      },
    ],
    offset: 67,
    length: 6,
    context: {
      text: '...say a sanctions tool need is that if it exists countries would hesitate to behave self...',
      offset: 43,
      length: 6,
    },
    sentence:
      'The main reason why people say a sanctions tool need is that if it exists countries would hesitate to behave selfishly and the world would become safer.',
    type: {
      typeName: 'Other',
    },
    rule: {
      id: 'AI_HYDRA_LEO_MISSING_COMMA',
      description:
        'This rule identifies whether commas are missing in a sentence.',
      issueType: 'uncategorized',
      category: {
        id: 'MISC',
        name: 'Miscellaneous',
      },
      isPremium: false,
    },
    ignoreForIncompleteSentence: false,
    contextForSureMatch: 0,
  },
  {
    message: 'Did you mean “does” or “doses”?',
    shortMessage: '',
    replacements: [
      {
        value: 'does',
        shortDescription: "third person of 'do'",
      },
      {
        value: 'doses',
      },
    ],
    offset: 219,
    length: 4,
    context: {
      text: '...sia have invaded Ukrain and North Korea dose not stop developing nuclear weapons, wh...',
      offset: 43,
      length: 4,
    },
    sentence:
      'However, unfortunately Russia have invaded Ukrain and North Korea dose not stop developing nuclear weapons, which means that sanctions are meaningless for world safe.',
    type: {
      typeName: 'Other',
    },
    rule: {
      id: 'DOSE_DOES',
      subId: '1',
      sourceFile: 'grammar.xml',
      description: 'dose vs does',
      issueType: 'misspelling',
      urls: [
        {
          value: 'https://languagetool.org/insights/post/grammar-forms-of-do/',
        },
      ],
      category: {
        id: 'CONFUSED_WORDS',
        name: 'Commonly Confused Words',
      },
      isPremium: false,
    },
    ignoreForIncompleteSentence: false,
    contextForSureMatch: 0,
  },
  {
    message: 'Did you mean “does” or “doses”?',
    shortMessage: '',
    replacements: [
      {
        value: 'does',
        shortDescription: "third person of 'do'",
      },
      {
        value: 'doses',
      },
    ],
    offset: 219,
    length: 4,
    context: {
      text: '...sia have invaded Ukrain and North Korea dose not stop developing nuclear weapons, wh...',
      offset: 43,
      length: 4,
    },
    sentence:
      'However, unfortunately Russia have invaded Ukrain and North Korea dose not stop developing nuclear weapons, which means that sanctions are meaningless for world safe.',
    type: {
      typeName: 'Other',
    },
    rule: {
      id: 'DOSE_DOES',
      subId: '1',
      sourceFile: 'grammar.xml',
      description: 'dose vs does',
      issueType: 'misspelling',
      urls: [
        {
          value: 'https://languagetool.org/insights/post/grammar-forms-of-do/',
        },
      ],
      category: {
        id: 'CONFUSED_WORDS',
        name: 'Commonly Confused Words',
      },
      isPremium: false,
    },
    ignoreForIncompleteSentence: false,
    contextForSureMatch: 0,
  },
];

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
  urls: {
    value: string;
  }[];
}

export interface CheckInfo {
  language: LanguageInfo;
  matches: Match[];
}
