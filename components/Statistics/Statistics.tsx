'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectTotalCount } from '@/redux/words/selectors';
import styles from './Statistics.module.css';

export default function Statistics() {
  const total = useAppSelector(selectTotalCount);

  return (
    <p className={styles.stat}>
      To study: <span className={styles.count}>{total}</span>
    </p>
  );
}
