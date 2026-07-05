'use client';

import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchCategories,
  fetchWords,
  fetchStatistics,
  addWord,
} from '@/redux/words/operations';
import {
  selectWords,
  selectFilters,
  selectPage,
  selectTotalPages,
  selectWordsLoading,
} from '@/redux/words/selectors';
import { setPage, resetWords } from '@/redux/words/slice';
import Dashboard from '@/components/Dashboard/Dashboard';
import WordsTable from '@/components/WordsTable/WordsTable';
import WordsPagination from '@/components/WordsPagination/WordsPagination';
import styles from '@/components/WordsSection/wordsSection.module.css';

export default function RecommendPage() {
  const dispatch = useAppDispatch();

  const words = useAppSelector(selectWords);
  const filters = useAppSelector(selectFilters);
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);
  const isLoading = useAppSelector(selectWordsLoading);

  useEffect(() => {
    dispatch(resetWords());
    dispatch(fetchCategories());
    dispatch(fetchStatistics());
  }, [dispatch]);

  const loadWords = useCallback(() => {
    dispatch(
      fetchWords({
        scope: 'all',
        keyword: filters.keyword,
        category: filters.category,
        isIrregular: filters.isIrregular,
        page,
      })
    );
  }, [dispatch, filters, page]);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const handleAdd = async (id: string) => {
    const result = await dispatch(addWord(id));
    if (addWord.fulfilled.match(result)) {
      toast.success('Word added to your dictionary');
      dispatch(fetchStatistics());
    } else {
      toast.error(result.payload as string);
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <Dashboard variant="recommend" />

        {isLoading ? (
          <p className={styles.loading}>Loading…</p>
        ) : words.length === 0 ? (
          <p className={styles.empty}>No words found. Try changing filters.</p>
        ) : (
          <WordsTable words={words} variant="recommend" onAdd={handleAdd} />
        )}

        <WordsPagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => dispatch(setPage(p))}
        />
      </div>
    </main>
  );
}
