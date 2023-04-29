export type LanguageInfo = {
  name: string;
  code: string;
  longCode: string;
};

// export interface LanguageInfo {
//   name: string;
//   code: string;
//   detectedLanguage: {
//     name: string;
//     code: string;
//   };
// }

export interface Word {
  text: string;
  checked: boolean;
  checkIndex?: number;
  color?: string;
  backgroundColor?: string;
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
  rule?: {
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
