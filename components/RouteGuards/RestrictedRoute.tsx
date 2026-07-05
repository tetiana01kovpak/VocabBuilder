'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLoggedIn } from '@/redux/auth/selectors';

export default function RestrictedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace('/dictionary');
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;
  return <>{children}</>;
}
