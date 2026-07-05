'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { register } from '@/redux/auth/operations';
import { registerSchema } from '@/lib/validation';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import styles from '@/components/AuthLayout/authForm.module.css';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const result = await dispatch(register(values));
      setSubmitting(false);
      if (register.fulfilled.match(result)) {
        router.replace('/dictionary');
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  const err = (f: 'name' | 'email' | 'password') =>
    formik.touched[f] && formik.errors[f];

  return (
    <div>
      <h1 className={styles.title}>Register</h1>
      <p className={styles.subtitle}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.field}>
          <input
            className={clsx(styles.input, err('name') && styles.inputError)}
            type="text"
            placeholder="Name"
            {...formik.getFieldProps('name')}
          />
          {err('name') && <span className={styles.error}>{formik.errors.name}</span>}
        </div>

        <div className={styles.field}>
          <input
            className={clsx(styles.input, err('email') && styles.inputError)}
            type="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
          {err('email') && (
            <span className={styles.error}>{formik.errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <PasswordInput
            name="password"
            value={formik.values.password}
            hasError={!!err('password')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {err('password') && (
            <span className={styles.error}>{formik.errors.password}</span>
          )}
        </div>

        <button
          className={styles.submit}
          type="submit"
          disabled={formik.isSubmitting}
        >
          Register
        </button>
      </form>
      <Link className={styles.link} href="/login">
        Login
      </Link>
    </div>
  );
}
