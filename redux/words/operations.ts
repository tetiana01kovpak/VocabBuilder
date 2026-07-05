import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, getErrorMessage } from '@/lib/api';
import type {
  Word,
  WordsResponse,
  WordsQuery,
  Statistics,
  Task,
  Answer,
  AnswerResult,
} from '@/lib/types';

type Scope = 'own' | 'all';

interface FetchWordsArg extends WordsQuery {
  scope: Scope;
}

export const fetchCategories = createAsyncThunk<string[]>(
  'words/categories',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<string[]>('/words/categories');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchWords = createAsyncThunk<WordsResponse, FetchWordsArg>(
  'words/fetch',
  async ({ scope, ...query }, thunkAPI) => {
    try {
      const params: WordsQuery = { limit: 7, ...query };
      if (!params.keyword) delete params.keyword;
      if (!params.category) delete params.category;
      if (params.isIrregular === undefined) delete params.isIrregular;
      const { data } = await api.get<WordsResponse>(`/words/${scope}`, {
        params,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createWord = createAsyncThunk<Word, Partial<Word>>(
  'words/create',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post<Word>('/words/create', body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addWord = createAsyncThunk<Word, string>(
  'words/add',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post<Word>(`/words/add/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const editWord = createAsyncThunk<
  Word,
  { id: string; body: Partial<Word> }
>('words/edit', async ({ id, body }, thunkAPI) => {
  try {
    const { data } = await api.patch<Word>(`/words/edit/${id}`, body);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteWord = createAsyncThunk<string, string>(
  'words/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/words/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchStatistics = createAsyncThunk<Statistics>(
  'words/statistics',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<Statistics>('/words/statistics');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchTasks = createAsyncThunk<Task[]>(
  'words/tasks',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<{ tasks?: Task[]; words?: Task[] }>(
        '/words/tasks'
      );
      return data.tasks ?? data.words ?? [];
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const sendAnswers = createAsyncThunk<AnswerResult[], Answer[]>(
  'words/answers',
  async (answers, thunkAPI) => {
    try {
      const { data } = await api.post<AnswerResult[]>('/words/answers', answers);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
