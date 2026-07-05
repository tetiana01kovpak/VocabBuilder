import Image from 'next/image';
import illustration from '@/public/images/auth-illustration.png';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.card}>{children}</div>
          <div className={styles.aside}>
            <Image
              className={styles.illustration}
              src={illustration}
              alt="Couple reading books"
              priority
              sizes="(max-width: 767px) 90vw, 498px"
            />
            <p className={styles.tags}>
              Word <span>·</span> Translation <span>·</span> Grammar{' '}
              <span>·</span> Progress
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
