import AuthLayout from '@/components/AuthLayout/AuthLayout';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import RestrictedRoute from '@/components/RouteGuards/RestrictedRoute';

export default function RegisterPage() {
  return (
    <RestrictedRoute>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </RestrictedRoute>
  );
}
