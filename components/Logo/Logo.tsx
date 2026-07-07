import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import styles from './Logo.module.css';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={styles.logo} href="/dictionary">
      <Icon name="logo" size={40} className={styles.mark} />
      <span className={light ? styles.textLight : styles.text}>VocabBuilder</span>
    </Link>
  );
}
