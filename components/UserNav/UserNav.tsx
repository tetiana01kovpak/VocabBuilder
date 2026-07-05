'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './UserNav.module.css';

const links = [
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/recommend', label: 'Recommend' },
  { href: '/training', label: 'Training' },
];

export default function UserNav({ light = false }: { light?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={clsx(styles.nav, light && styles.navColumn)}>
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              styles.link,
              light && styles.linkLight,
              active && (light ? styles.activeLight : styles.active)
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
