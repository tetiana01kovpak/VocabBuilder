export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
}

export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner: string;
  progress: number;
}

export interface WordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface Statistics {
  totalCount: number;
}

export interface Task {
  _id: string;
  en?: string;
  ua?: string;
  task: 'en' | 'ua';
}

export interface Answer {
  _id: string;
  en: string;
  ua: string;
  task: 'en' | 'ua';
}

export interface AnswerResult extends Answer {
  isDone: boolean;
}

export interface WordsQuery {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
}
