'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/selectors';
import { logOut } from '@/redux/auth/operations';
import Icon from '@/components/ui/Icon';
import styles from './UserBar.module.css';

export default function UserBar({ light = false }: { light?: boolean }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    await dispatch(logOut());
    router.replace('/login');
  };

  return (
    <div className={styles.bar}>
      <span className={light ? styles.nameLight : styles.name}>
        {user.name || 'User'}
      </span>
      <span className={styles.avatar}>
        <Icon name="user" size={24} className={styles.avatarIcon} />
      </span>
      <button
        type="button"
        className={light ? styles.logoutLight : styles.logout}
        onClick={handleLogout}
      >
        Log out
        <Icon name="arrow-right" size={20} />
      </button>
    </div>
  );
}
