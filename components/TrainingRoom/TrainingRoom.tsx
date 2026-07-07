'use client';

import type { Task } from '@/lib/types';
import Icon from '@/components/ui/Icon';
import styles from './TrainingRoom.module.css';

interface Props {
  task: Task;
  value: string;
  isLast: boolean;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function TrainingRoom({
  task,
  value,
  isLast,
  onChange,
  onNext,
}: Props) {
  // Design: Ukrainian side is always left, English side always right.
  const answerInUkrainian = task.task === 'ua';

  const input = (
    <textarea
      className={styles.input}
      placeholder="Введіть переклад"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  return (
    <div className={styles.room}>
      <div className={styles.left}>
        <span className={styles.lang}>
          <Icon name="flag-ua" size={28} />
          Ukrainian
        </span>
        {answerInUkrainian ? input : <p className={styles.word}>{task.ua}</p>}
        {!isLast && (
          <button type="button" className={styles.next} onClick={onNext}>
            Next
            <Icon name="arrow-right" size={20} className={styles.nextIcon} />
          </button>
        )}
      </div>

      <div className={styles.right}>
        <span className={styles.lang}>
          <Icon name="flag-uk" size={28} />
          English
        </span>
        {answerInUkrainian ? <p className={styles.word}>{task.en}</p> : input}
      </div>
    </div>
  );
}
