'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { fetchTasks, sendAnswers } from '@/redux/words/operations';
import type { Task, Answer, AnswerResult } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import TrainingRoom from '@/components/TrainingRoom/TrainingRoom';
import WellDoneModal from '@/components/WellDoneModal/WellDoneModal';
import styles from './training.module.css';

function buildAnswer(task: Task, value: string): Answer {
  const given =
    task.task === 'ua' ? { en: task.en || '' } : { ua: task.ua || '' };
  const filled = task.task === 'ua' ? { ua: value } : { en: value };
  return { _id: task._id, task: task.task, en: '', ua: '', ...given, ...filled };
}

export default function TrainingPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [value, setValue] = useState('');
  const [results, setResults] = useState<AnswerResult[] | null>(null);

  useEffect(() => {
    dispatch(fetchTasks()).then((res) => {
      if (fetchTasks.fulfilled.match(res)) setTasks(res.payload);
      else {
        toast.error(res.payload as string);
        setTasks([]);
      }
    });
  }, [dispatch]);

  if (tasks === null) {
    return (
      <main className={styles.page}>
        <div className="container">
          <p className={styles.loading}>Loading…</p>
        </div>
      </main>
    );
  }

  if (tasks.length === 0) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>
              You don&apos;t have a single word to learn right now.
            </h2>
            <p className={styles.emptyText}>
              Please create or add a word to start the workout. We want to
              improve your vocabulary and develop your knowledge, so please share
              the words you are interested in adding to your study.
            </p>
            <Link href="/dictionary?addWord=true" className={styles.addLink}>
              Add word
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const current = tasks[index];
  const isLast = index === tasks.length - 1;
  const progress = (answers.length / tasks.length) * 100;

  const handleNext = () => {
    const v = value.trim();
    if (v) setAnswers((a) => [...a, buildAnswer(current, v)]);
    setValue('');
    setIndex((i) => i + 1);
  };

  const handleSave = async () => {
    const v = value.trim();
    const finalAnswers = v ? [...answers, buildAnswer(current, v)] : answers;
    const res = await dispatch(sendAnswers(finalAnswers));
    if (sendAnswers.fulfilled.match(res)) {
      setResults(res.payload);
    } else {
      toast.error('Something went wrong, your progress was not saved.');
      router.replace('/dictionary');
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.progress}>
          <ProgressBar
            value={progress}
            size={56}
            stroke={3}
            label={String(tasks.length - answers.length)}
          />
        </div>

        <TrainingRoom
          task={current}
          value={value}
          isLast={isLast}
          onChange={setValue}
          onNext={handleNext}
        />

        <div className={styles.buttons}>
          <button type="button" className={styles.save} onClick={handleSave}>
            Save
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => router.replace('/dictionary')}
          >
            Cancel
          </button>
        </div>
      </div>

      {results && (
        <WellDoneModal
          results={results}
          onClose={() => router.replace('/dictionary')}
        />
      )}
    </main>
  );
}
