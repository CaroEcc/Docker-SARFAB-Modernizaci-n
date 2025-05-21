import OperationDetails from '@/components/operation/OperationDetails';
import OperationPersonnelDetail from '@/components/operation/OperationPersonnelDetail';
import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { useGetOperationDetail } from '@/hooks/operation/querys/useGetOperationDetail';
import { useParams } from 'react-router-dom';
import Loader from "@/components/common/Loader";

export default function DetailOperationView() {
  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Detalle de la operación' },
  ]);

  const { operationId } = useParams<{ operationId: string }>();
  const operationIdNumber = Number(operationId);

  const { data: operation, isLoading: isLoadingOperation } =
    useGetOperationDetail(operationIdNumber);

  return isLoadingOperation ? (
    <Loader message="Cargando datos de la operación" />
  ) : (
    <section className="container mx-auto p-4">
      <section className="flex flex-col md:flex-row gap-6">
        <article className="flex-1">
          {operation && <OperationDetails operation={operation} />}
        </article>
        <article className="flex-1">
          {operation && <OperationPersonnelDetail operation={operation} />}
        </article>
      </section>
    </section>
  );
}
