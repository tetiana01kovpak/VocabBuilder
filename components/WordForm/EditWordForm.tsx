'use client';

import { useFormik } from 'formik';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { editWord } from '@/redux/words/operations';
import { wordSchema } from '@/lib/validation';
import type { Word } from '@/lib/types';
import Icon from '@/components/ui/Icon';
import styles from './wordForm.module.css';

interface Props {
  word: Word;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditWordForm({ word, onSuccess, onCancel }: Props) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { ua: word.ua, en: word.en },
    validationSchema: wordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const body: {
        en: string;
        ua: string;
        category: string;
        isIrregular?: boolean;
      } = { en: values.en, ua: values.ua, category: word.category };
      if (word.category === 'verb') body.isIrregular = !!word.isIrregular;
      const result = await dispatch(editWord({ id: word._id, body }));
      setSubmitting(false);
      if (editWord.fulfilled.match(result)) {
        toast.success('Word updated');
        onSuccess();
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  return (
    <div>
      <h2 className={styles.title}>Edit word</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <input
              className={clsx(
                styles.input,
                formik.touched.ua && formik.errors.ua && styles.inputError
              )}
              type="text"
              placeholder="Введіть слово"
              {...formik.getFieldProps('ua')}
            />
            {formik.touched.ua && formik.errors.ua && (
              <span className={styles.error}>{formik.errors.ua}</span>
            )}
          </div>
          <span className={styles.lang}>
            <Icon name="flag-ua" size={28} />
            Ukrainian
          </span>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <input
              className={clsx(
                styles.input,
                formik.touched.en && formik.errors.en && styles.inputError
              )}
              type="text"
              placeholder="Enter a word"
              {...formik.getFieldProps('en')}
            />
            {formik.touched.en && formik.errors.en && (
              <span className={styles.error}>{formik.errors.en}</span>
            )}
          </div>
          <span className={styles.lang}>
            <Icon name="flag-uk" size={28} />
            English
          </span>
        </div>

        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.add}
            disabled={formik.isSubmitting}
          >
            Save
          </button>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
