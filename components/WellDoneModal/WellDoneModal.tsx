'use client';

import Modal from '@/components/Modal/Modal';
import type { AnswerResult } from '@/lib/types';
import styles from './WellDoneModal.module.css';

interface Props {
  results: AnswerResult[];
  onClose: () => void;
}

export default function WellDoneModal({ results, onClose }: Props) {
  const correct = results.filter((r) => r.isDone);
  const mistakes = results.filter((r) => !r.isDone);

  return (
    <Modal variant="green" onClose={onClose}>
      <div className={styles.content}>
        <h2 className={styles.title}>Well done</h2>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.label}>Correct answers:</p>
            <ul>
              {correct.map((r) => (
                <li key={r._id} className={styles.word}>
                  {r.en}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <p className={styles.label}>Mistakes:</p>
            <ul>
              {mistakes.map((r) => (
                <li key={r._id} className={styles.word}>
                  {r.en}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
