'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCategories, selectFilters } from '@/redux/words/selectors';
import { setKeyword, setCategory, setIsIrregular } from '@/redux/words/slice';
import { useDebounce } from '@/lib/useDebounce';
import Select from '@/components/ui/Select';
import Icon from '@/components/ui/Icon';
import styles from './Filters.module.css';

export default function Filters() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const filters = useAppSelector(selectFilters);

  const [search, setSearch] = useState('');
  const debounced = useDebounce(search.trim(), 300);

  useEffect(() => {
    dispatch(setKeyword(debounced));
  }, [debounced, dispatch]);

  const options = [
    { value: '', label: 'All' },
    ...categories.map((c) => ({ value: c, label: c[0].toUpperCase() + c.slice(1) })),
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="text"
          placeholder="Find the word"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Icon name="search" size={20} className={styles.searchIcon} />
      </div>

      <div className={styles.select}>
        <Select
          options={options}
          value={filters.category}
          placeholder="Categories"
          onChange={(v) => dispatch(setCategory(v))}
        />
      </div>

      {filters.category === 'verb' && (
        <div className={styles.radios}>
          <label className={styles.radio}>
            <input
              type="radio"
              name="verbType"
              checked={filters.isIrregular === false}
              onChange={() => dispatch(setIsIrregular(false))}
            />
            <span className={styles.dot} />
            Regular
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="verbType"
              checked={filters.isIrregular === true}
              onChange={() => dispatch(setIsIrregular(true))}
            />
            <span className={styles.dot} />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
