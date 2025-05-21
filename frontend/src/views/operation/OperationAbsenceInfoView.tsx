import Loader from "@/components/common/Loader"
import OperationAbsenceInfo from "@/components/operation/OperationAbsenceInfo"
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb"
import { useGetOperationAbsence } from "@/hooks/operation/querys/useGetOperationAbsence"
import { useParams } from "react-router-dom"

export default function OperationAbsenceInfoView() {
  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Marcar asistencia' },])
  
  const { operationId } = useParams<{ operationId: string }>()
  const operationIdNumber = Number(operationId)

  const { data: operation, isLoading: isLoadingOperation } = useGetOperationAbsence(operationIdNumber);
  
  return isLoadingOperation ? (
    <Loader message="Cargando datos de la operación y control de asistencia" />
  ) : (
    <div className="container mx-auto p-4">
        <OperationAbsenceInfo
          data={operation!}
          operationId={operationIdNumber}
        />
  </div>
  );
}