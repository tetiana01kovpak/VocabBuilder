import type { RootState } from '../store';

export const selectCategories = (state: RootState) => state.words.categories;
export const selectWords = (state: RootState) => state.words.items;
export const selectTotalPages = (state: RootState) => state.words.totalPages;
export const selectPage = (state: RootState) => state.words.page;
export const selectTotalCount = (state: RootState) => state.words.totalCount;
export const selectFilters = (state: RootState) => state.words.filters;
export const selectWordsLoading = (state: RootState) => state.words.isLoading;
