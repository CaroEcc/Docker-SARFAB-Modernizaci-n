import { UserLoginForm } from "@/types/index";

export interface AuthFormProps {
    onSubmit: (data: UserLoginForm) => void;
    isLoading: boolean;
}