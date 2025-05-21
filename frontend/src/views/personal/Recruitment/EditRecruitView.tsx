import Loader from "@/components/common/Loader";
import EditRecruitForm from "@/components/recruitment/EditRecruitForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useEditRecruit } from "@/hooks/recruitment";
import { useParams } from "react-router-dom";

export default function EditRecruitView() {
  useBreadcrumb([{ label: "Reclutamiento", path: "/recruitment/list" }, { label: "Editar recluta" }]);
  
  const params = useParams();
  const recruitId = params.recruitId!;

  const { data, isLoading, isError } = useEditRecruit(recruitId);

  if (isLoading) return <Loader message="Cargando datos del recluta"/>;
  if (isError) return 'Error'; //<Navigate to="/404" />
  if (data) return <EditRecruitForm data={data} recruitId={Number(recruitId)} />
}
