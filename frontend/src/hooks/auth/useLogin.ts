import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserLoginForm } from "@/types/index";
import { authenticateUser } from "@/api/AuthApi";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message || "Ha ocurrido un error inesperado");
    },
    onSuccess: () => {
      navigate("/notificaciones");
    },
  });

  const login = (formData: UserLoginForm) => mutate(formData);

  return { login, isPending };
};
