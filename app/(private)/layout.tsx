import Header from '@/components/Header/Header';
import PrivateRoute from '@/components/RouteGuards/PrivateRoute';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <Header />
      {children}
    </PrivateRoute>
  );
}
