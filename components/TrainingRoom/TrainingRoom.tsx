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
  const givenIsEnglish = task.task === 'ua';
  const givenWord = givenIsEnglish ? task.en : task.ua;

  return (
    <div className={styles.room}>
      <div className={styles.left}>
        <span className={styles.langLeft}>
          <Icon name={givenIsEnglish ? 'flag-ua' : 'flag-uk'} size={28} />
          {givenIsEnglish ? 'Ukrainian' : 'English'}
        </span>
        <textarea
          className={styles.input}
          placeholder="Введіть переклад"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {!isLast && (
          <button type="button" className={styles.next} onClick={onNext}>
            Next
            <Icon name="arrow-right" size={20} className={styles.nextIcon} />
          </button>
        )}
      </div>

      <div className={styles.right}>
        <p className={styles.word}>{givenWord}</p>
        <span className={styles.lang}>
          <Icon name={givenIsEnglish ? 'flag-uk' : 'flag-ua'} size={28} />
          {givenIsEnglish ? 'English' : 'Ukrainian'}
        </span>
      </div>
    </div>
  );
}
