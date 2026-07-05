'use client';

import { useState } from 'react';
import Logo from '@/components/Logo/Logo';
import UserNav from '@/components/UserNav/UserNav';
import UserBar from '@/components/UserBar/UserBar';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';
import Icon from '@/components/ui/Icon';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Logo />
          <div className={styles.desktopNav}>
            <UserNav />
          </div>
          <div className={styles.desktopBar}>
            <UserBar />
          </div>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="burger" size={32} />
          </button>
        </div>
      </div>
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
