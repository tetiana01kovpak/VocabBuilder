'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectIsLoggedIn, selectToken } from '@/redux/auth/selectors';
import { refreshUser } from '@/redux/auth/operations';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) dispatch(refreshUser());
  }, [dispatch, token]);

  useEffect(() => {
    if (!token) router.replace('/login');
  }, [token, router]);

  if (!token || !isLoggedIn) return null;
  return <>{children}</>;
}
