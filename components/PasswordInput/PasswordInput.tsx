'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Icon from '@/components/ui/Icon';
import styles from '@/components/AuthLayout/authForm.module.css';

interface Props {
  name: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  success?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

export default function PasswordInput({
  name,
  value,
  placeholder = 'Password',
  hasError,
  success,
  onChange,
  onBlur,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.inputWrap}>
      <input
        className={clsx(
          styles.input,
          hasError && styles.inputError,
          success && styles.inputSuccess
        )}
        type={visible ? 'text' : 'password'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="current-password"
      />
      <button
        type="button"
        className={styles.eye}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <Icon name={visible ? 'eye' : 'eye-off'} size={20} />
      </button>
    </div>
  );
}
