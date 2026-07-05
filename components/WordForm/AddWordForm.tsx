'use client';

import { useFormik } from 'formik';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCategories } from '@/redux/words/selectors';
import { createWord } from '@/redux/words/operations';
import { addWordSchema } from '@/lib/validation';
import Select from '@/components/ui/Select';
import Icon from '@/components/ui/Icon';
import styles from './wordForm.module.css';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddWordForm({ onSuccess, onCancel }: Props) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const formik = useFormik({
    initialValues: {
      category: '',
      isIrregular: undefined as boolean | undefined,
      ua: '',
      en: '',
    },
    validationSchema: addWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const body: {
        en: string;
        ua: string;
        category: string;
        isIrregular?: boolean;
      } = { en: values.en, ua: values.ua, category: values.category };
      if (values.category === 'verb') body.isIrregular = !!values.isIrregular;

      const result = await dispatch(createWord(body));
      setSubmitting(false);
      if (createWord.fulfilled.match(result)) {
        toast.success('Word added to your dictionary');
        onSuccess();
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  const options = categories.map((c) => ({
    value: c,
    label: c[0].toUpperCase() + c.slice(1),
  }));

  return (
    <div>
      <h2 className={styles.title}>Add word</h2>
      <p className={styles.subtitle}>
        Adding a new word to the dictionary is an important step in enriching the
        language base and expanding the vocabulary.
      </p>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.selectRow}>
          <Select
            options={options}
            value={formik.values.category}
            placeholder="Categories"
            variant="filled"
            onChange={(v) => formik.setFieldValue('category', v)}
          />
          {formik.touched.category && formik.errors.category && (
            <span className={styles.error}>{formik.errors.category}</span>
          )}
        </div>

        {formik.values.category === 'verb' && (
          <>
            <div className={styles.radios}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="isIrregular"
                  checked={formik.values.isIrregular === false}
                  onChange={() => formik.setFieldValue('isIrregular', false)}
                />
                <span className={styles.dot} />
                Regular
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="isIrregular"
                  checked={formik.values.isIrregular === true}
                  onChange={() => formik.setFieldValue('isIrregular', true)}
                />
                <span className={styles.dot} />
                Irregular
              </label>
            </div>
            <p className={styles.hint}>
              Such data must be entered in the format I form-II form-III form.
            </p>
          </>
        )}

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
            Add
          </button>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
