import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useVolunteerHistoryDemeritPoints } from "@/hooks/recruitment/querys/useHistoryDemeritPoints";
import { useParams } from "react-router-dom";
import BackLink from "@/components/common/BackLink/BackLink";
import SimpleSortableTable from "@/components/common/SimpleSortableTable/SimpleSortableTable";
import VolunteerDeleteDemeritPointModal from "../modals/VolunteerDeleteDemeritPointModal";
import Loader from "@/components/common/Loader";

// Mejora el tipo si usas react-table
interface VolunteerHistoryDemeritPointsProps {
  columns: any[]; // Idealmente: ColumnDef<any, any>[]
}

export default function VolunteerHistoryDemeritPoints({ columns }: VolunteerHistoryDemeritPointsProps) {
  const { volunteerId } = useParams();
  const volunteerIdString = volunteerId ?? "";

  useBreadcrumb([
    { label: "Voluntarios", path: `/volunteers/${volunteerIdString}/view` },
    { label: "Historial de faltas" }
  ]);

  const {
    data,
    isLoading,
    isError,
    isSuccess
  } = useVolunteerHistoryDemeritPoints({ volunteerId: volunteerIdString });

  if (!volunteerIdString) {
    return <p className="text-red-500 p-4">ID del voluntario no encontrado.</p>;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <BackLink
          text="Volver al listado de voluntarios"
          iconSize={20}
          link={`/volunteers/${volunteerIdString}/view`}
          useRouter={true}
        />

        <h3 className="px-6.5 mt-3 text-2xl font-semibold text-black dark:text-white">
          Historial de faltas
        </h3>

        <div className="p-6">
          {isLoading && (
            <Loader message="Cargando historial..."/>
          )}

          {isError && (
            <p className="text-red-500">Ocurrió un error al cargar el historial de faltas. Intenta nuevamente más tarde.</p>
          )}

          {isSuccess && (!data || data.length === 0) && (
            <p className="text-gray-500">No hay historial de faltas registrado para este voluntario.</p>
          )}

          {isSuccess && data && data.length > 0 && (
            <SimpleSortableTable columns={columns} data={data} />
          )}
        </div>
      </div>
      <VolunteerDeleteDemeritPointModal />
    </>
  );
}
