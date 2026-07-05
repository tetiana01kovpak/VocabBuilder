'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from '@/components/ui/Icon';
import styles from './Select.module.css';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  variant?: 'filled' | 'plain';
}

export default function Select({
  options,
  value,
  placeholder = 'Categories',
  onChange,
  variant = 'plain',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={clsx(styles.wrap, styles[variant])} ref={ref}>
      <button
        type="button"
        className={styles.control}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={!selected ? styles.placeholder : undefined}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="chevron-down"
          size={20}
          className={clsx(styles.chevron, open && styles.chevronOpen)}
        />
      </button>
      {open && (
        <ul className={styles.list}>
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                className={clsx(styles.option, o.value === value && styles.optionActive)}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
