'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLoggedIn } from '@/redux/auth/selectors';

export default function Home() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    router.replace(isLoggedIn ? '/dictionary' : '/login');
  }, [isLoggedIn, router]);

  return null;
}
