export interface InfoComment {
  id: string;
  start: number;
  end: number;
  original: string;
  fix: string;
  detail: string;
}

export interface InfoCommentAndroid {
  id: string;
  original: string;
  fix: string;
  detail: string;
}

export interface Selection {
  start: number;
  end: number;
}
