'use client';

import Link from 'next/link';
import Filters from '@/components/Filters/Filters';
import Statistics from '@/components/Statistics/Statistics';
import Icon from '@/components/ui/Icon';
import styles from './Dashboard.module.css';

interface Props {
  variant?: 'dictionary' | 'recommend';
  onAddWord?: () => void;
}

export default function Dashboard({ variant = 'dictionary', onAddWord }: Props) {
  return (
    <div className={styles.dashboard}>
      <Filters />
      <div className={styles.actions}>
        <Statistics />
        {variant === 'dictionary' && (
          <button type="button" className={styles.addBtn} onClick={onAddWord}>
            Add word
            <Icon name="plus" size={20} className={styles.plus} />
          </button>
        )}
        <Link href="/training" className={styles.train}>
          Train oneself
          <Icon name="arrow-right" size={20} className={styles.arrow} />
        </Link>
      </div>
    </div>
  );
}
