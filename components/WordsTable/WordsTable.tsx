'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import type { Word } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ActionsPopover from './ActionsPopover';
import Icon from '@/components/ui/Icon';
import styles from './WordsTable.module.css';

interface Props {
  words: Word[];
  variant?: 'dictionary' | 'recommend';
  onEdit?: (word: Word) => void;
  onDelete?: (id: string) => void;
  onAdd?: (id: string) => void;
}

const columnHelper = createColumnHelper<Word>();

export default function WordsTable({
  words,
  variant = 'dictionary',
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const columns = useMemo(() => {
    const base = [
      columnHelper.accessor('en', {
        header: () => (
          <span className={styles.headCell}>
            Word <Icon name="flag-uk" size={28} />
          </span>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('ua', {
        header: () => (
          <span className={styles.headCell}>
            Translation <Icon name="flag-ua" size={28} />
          </span>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => {
          const c = info.getValue();
          return c ? c[0].toUpperCase() + c.slice(1) : '';
        },
      }),
    ];

    if (variant === 'dictionary') {
      base.push(
        columnHelper.accessor('progress', {
          header: 'Progress',
          cell: (info) => (
            <span className={styles.progress}>
              {info.getValue() ?? 0}%
              <ProgressBar value={info.getValue() ?? 0} />
            </span>
          ),
        }) as never
      );
      base.push(
        columnHelper.display({
          id: 'actions',
          header: '',
          cell: ({ row }) => (
            <ActionsPopover
              onEdit={() => onEdit?.(row.original)}
              onDelete={() => onDelete?.(row.original._id)}
            />
          ),
        }) as never
      );
    } else {
      base.push(
        columnHelper.display({
          id: 'add',
          header: '',
          cell: ({ row }) => (
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => onAdd?.(row.original._id)}
            >
              Add to dictionary
              <Icon name="arrow-right" size={20} className={styles.addIcon} />
            </button>
          ),
        }) as never
      );
    }

    return base;
  }, [variant, onEdit, onDelete, onAdd]);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
