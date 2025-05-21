
import AuthForm from "@/components/auth/AuthForm";
import { useLogin } from "@/hooks/auth/useLogin";
import "./singIn.css"
import AuthLoginLayout from "@/components/auth/AuthLoginLayout";
const SignIn = () => {
  const { login, isPending } = useLogin();

  return (
    <AuthLoginLayout>
        <AuthForm onSubmit={login} isLoading={isPending} />
    </AuthLoginLayout>
  );
};

export default SignIn;
