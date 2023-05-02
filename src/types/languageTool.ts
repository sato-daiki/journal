export type LanguageInfo = {
  name: string;
  code: string;
  longCode: string;
};

export type LongCode =
  | 'en-AU'
  | 'en-GB'
  | 'en-CA'
  | 'en-NZ'
  | 'en-ZA'
  | 'en-US'
  | 'de-AT'
  | 'de-DE'
  | 'de-CH'
  | 'es'
  | 'fr'
  | 'pt-AO'
  | 'pt-BR'
  | 'pt-MZ'
  | 'pt-PT'
  | 'nl';

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

export interface LanguageTool {
  titleMatches?: Match[] | [];
  textMatches?: Match[] | [];
}
