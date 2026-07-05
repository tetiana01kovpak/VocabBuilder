'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import styles from './ActionsPopover.module.css';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionsPopover({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-label="Word actions"
      >
        <Icon name="dots" size={20} />
      </button>
      {open && (
        <div className={styles.menu}>
          <button
            type="button"
            className={styles.item}
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            <Icon name="edit" size={20} className={styles.icon} />
            Edit
          </button>
          <button
            type="button"
            className={styles.item}
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            <Icon name="trash" size={20} className={styles.icon} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
