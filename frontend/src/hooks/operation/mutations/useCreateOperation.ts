import { createOperation } from "@/api/OperationAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateOperation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createOperation,
    onError: () => toast.error("Ocurrió un error al registrar la operación"),
    onSuccess: () => {
      toast.success("Operación registrada correctamente");
      navigate("/operation/list");
    },
  });
}