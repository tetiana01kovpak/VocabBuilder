'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { logIn } from '@/redux/auth/operations';
import { loginSchema } from '@/lib/validation';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import styles from '@/components/AuthLayout/authForm.module.css';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const result = await dispatch(logIn(values));
      setSubmitting(false);
      if (logIn.fulfilled.match(result)) {
        router.replace('/dictionary');
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  const err = (f: 'email' | 'password') => formik.touched[f] && formik.errors[f];

  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>
        Please enter your login details to continue using our service:
      </p>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
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
          Login
        </button>
      </form>
      <Link className={styles.link} href="/register">
        Register
      </Link>
    </div>
  );
}
