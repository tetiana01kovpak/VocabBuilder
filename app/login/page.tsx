import AuthLayout from '@/components/AuthLayout/AuthLayout';
import LoginForm from '@/components/LoginForm/LoginForm';
import RestrictedRoute from '@/components/RouteGuards/RestrictedRoute';

export default function LoginPage() {
  return (
    <RestrictedRoute>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </RestrictedRoute>
  );
}
