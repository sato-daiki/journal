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

// 取得したまま
export interface RawMatch {
  message: string;
  shortMessage?: string;
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
    subId?: string;
    description: string;
    urls?: [
      {
        value: string;
      },
    ];
    issueType?: string;
    category: {
      id: string;
      name: string;
    };
  };
}

export interface Match {
  message: string;
  shortMessage: string | null;
  offset: number;
  length: number;
  replacements: {
    value: string;
  }[];
  rule: {
    description: string;
    urls:
      | [
          {
            value: string;
          },
        ]
      | null;
    issueType: string | null;
  } | null;
}

export type Result = 'perfect' | 'corrected' | 'skip' | 'error';

export interface LanguageTool {
  titleMatches: Match[] | [];
  titleResult: Result;
  titleError?: string | null;
  textMatches: Match[] | [];
  textResult: Result;
  textError?: string | null;
}
