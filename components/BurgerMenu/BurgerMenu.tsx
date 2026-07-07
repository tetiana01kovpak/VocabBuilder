'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import illustration from '@/public/images/auth-illustration.png';
import Icon from '@/components/ui/Icon';
import UserNav from '@/components/UserNav/UserNav';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/selectors';
import { logOut } from '@/redux/auth/operations';
import styles from './BurgerMenu.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BurgerMenu({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleLogout = async () => {
    onClose();
    await dispatch(logOut());
    router.replace('/login');
  };

  return (
    <>
      <div
        className={clsx(styles.backdrop, open && styles.backdropOpen)}
        onClick={onClose}
      />
      <aside className={clsx(styles.drawer, open && styles.drawerOpen)}>
        <div className={styles.top}>
          <div className={styles.user}>
            <span className={styles.name}>{user.name || 'User'}</span>
            <span className={styles.avatar}>
              <Icon name="user" size={24} className={styles.avatarIcon} />
            </span>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" size={32} />
          </button>
        </div>

        <div className={styles.nav} onClick={onClose}>
          <UserNav light />
        </div>

        <button type="button" className={styles.logout} onClick={handleLogout}>
          Log out
          <Icon name="arrow-right" size={20} />
        </button>

        <Image
          className={styles.illustration}
          src={illustration}
          alt=""
          sizes="340px"
        />
      </aside>
    </>
  );
}
