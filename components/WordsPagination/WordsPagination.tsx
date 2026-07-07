'use client';

import clsx from 'clsx';
import Icon from '@/components/ui/Icon';
import styles from './WordsPagination.module.css';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPages(page: number, total: number): (number | 'dots')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'dots')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) pages.push('dots');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('dots');
  pages.push(total);
  return pages;
}

export default function WordsPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    if (p >= 1 && p <= totalPages && p !== page) onChange(p);
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.arrow}
        onClick={() => go(1)}
        disabled={page === 1}
        aria-label="First page"
      >
        <Icon name="arrow-right" size={16} className={styles.doubleLeft} />
        <Icon name="arrow-right" size={16} className={styles.doubleLeft} />
      </button>
      <button
        className={styles.arrow}
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <Icon name="arrow-right" size={16} className={styles.left} />
      </button>

      {getPages(page, totalPages).map((p, i) =>
        p === 'dots' ? (
          <span key={`dots-${i}`} className={styles.dots}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={clsx(styles.page, p === page && styles.active)}
            onClick={() => go(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className={styles.arrow}
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <Icon name="arrow-right" size={16} />
      </button>
      <button
        className={styles.arrow}
        onClick={() => go(totalPages)}
        disabled={page === totalPages}
        aria-label="Last page"
      >
        <Icon name="arrow-right" size={16} />
        <Icon name="arrow-right" size={16} />
      </button>
    </nav>
  );
}
