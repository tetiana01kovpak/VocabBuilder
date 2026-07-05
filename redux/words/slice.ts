import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchWords,
  createWord,
  deleteWord,
  fetchStatistics,
} from './operations';
import type { Word } from '@/lib/types';

interface Filters {
  keyword: string;
  category: string;
  isIrregular: boolean | undefined;
}

interface WordsState {
  categories: string[];
  items: Word[];
  totalPages: number;
  page: number;
  totalCount: number;
  filters: Filters;
  isLoading: boolean;
}

const initialState: WordsState = {
  categories: [],
  items: [],
  totalPages: 1,
  page: 1,
  totalCount: 0,
  filters: { keyword: '', category: '', isIrregular: undefined },
  isLoading: false,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setKeyword(state, { payload }: PayloadAction<string>) {
      state.filters.keyword = payload;
      state.page = 1;
    },
    setCategory(state, { payload }: PayloadAction<string>) {
      state.filters.category = payload;
      state.filters.isIrregular = undefined;
      state.page = 1;
    },
    setIsIrregular(state, { payload }: PayloadAction<boolean | undefined>) {
      state.filters.isIrregular = payload;
      state.page = 1;
    },
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    resetWords() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(fetchWords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWords.fulfilled, (state, { payload }) => {
        state.items = payload.results;
        state.totalPages = payload.totalPages ?? 1;
        state.page = payload.page ?? state.page;
        state.isLoading = false;
      })
      .addCase(fetchWords.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchStatistics.fulfilled, (state, { payload }) => {
        state.totalCount = payload.totalCount;
      })
      .addCase(createWord.fulfilled, (state) => {
        state.totalCount += 1;
      })
      .addCase(deleteWord.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((w) => w._id !== payload);
        if (state.totalCount > 0) state.totalCount -= 1;
      });
  },
});

export const { setKeyword, setCategory, setIsIrregular, setPage, resetWords } =
  wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
