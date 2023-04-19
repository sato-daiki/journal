export interface LanguageInfo {
  name: string;
  code: string;
  detectedLanguage: {
    name: string;
    code: string;
  };
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
