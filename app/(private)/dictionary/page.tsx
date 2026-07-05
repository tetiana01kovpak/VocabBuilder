'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchCategories,
  fetchWords,
  fetchStatistics,
  deleteWord,
} from '@/redux/words/operations';
import {
  selectWords,
  selectFilters,
  selectPage,
  selectTotalPages,
  selectWordsLoading,
} from '@/redux/words/selectors';
import { setPage, resetWords } from '@/redux/words/slice';
import type { Word } from '@/lib/types';
import Dashboard from '@/components/Dashboard/Dashboard';
import WordsTable from '@/components/WordsTable/WordsTable';
import WordsPagination from '@/components/WordsPagination/WordsPagination';
import Modal from '@/components/Modal/Modal';
import AddWordForm from '@/components/WordForm/AddWordForm';
import EditWordForm from '@/components/WordForm/EditWordForm';
import styles from '@/components/WordsSection/wordsSection.module.css';

export default function DictionaryPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const words = useAppSelector(selectWords);
  const filters = useAppSelector(selectFilters);
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);
  const isLoading = useAppSelector(selectWordsLoading);

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Word | null>(null);

  useEffect(() => {
    dispatch(resetWords());
    dispatch(fetchCategories());
    dispatch(fetchStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get('addWord') === 'true') {
      setAddOpen(true);
      router.replace('/dictionary');
    }
  }, [searchParams, router]);

  const loadWords = useCallback(() => {
    dispatch(
      fetchWords({
        scope: 'own',
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

  const refresh = () => {
    loadWords();
    dispatch(fetchStatistics());
  };

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteWord(id));
    if (deleteWord.fulfilled.match(result)) {
      toast.success('Word deleted');
      refresh();
    } else {
      toast.error(result.payload as string);
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <Dashboard variant="dictionary" onAddWord={() => setAddOpen(true)} />

        {isLoading ? (
          <p className={styles.loading}>Loading…</p>
        ) : words.length === 0 ? (
          <p className={styles.empty}>
            No words found. Try changing filters or add a new word.
          </p>
        ) : (
          <WordsTable
            words={words}
            variant="dictionary"
            onEdit={setEditTarget}
            onDelete={handleDelete}
          />
        )}

        <WordsPagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => dispatch(setPage(p))}
        />
      </div>

      {addOpen && (
        <Modal variant="green" onClose={() => setAddOpen(false)}>
          <AddWordForm
            onSuccess={() => {
              setAddOpen(false);
              refresh();
            }}
            onCancel={() => setAddOpen(false)}
          />
        </Modal>
      )}

      {editTarget && (
        <Modal variant="green" onClose={() => setEditTarget(null)}>
          <EditWordForm
            word={editTarget}
            onSuccess={() => {
              setEditTarget(null);
              refresh();
            }}
            onCancel={() => setEditTarget(null)}
          />
        </Modal>
      )}
    </main>
  );
}
