import Loader from "@/components/common/Loader";
import EditVolunteerForm from "@/components/volunteer/forms/EditVolunteerForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useDetailsVolunteer } from "@/hooks/volunteer/querys/useEditVolunteerData";
import { useParams } from "react-router-dom";

export default function EditVolunteerView() {
  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Editar voluntario" }]);
  
  const params = useParams();
  const volunteerId = params.volunteerId!;

  const { data, isLoading, isError } = useDetailsVolunteer(volunteerId);

  if (isLoading) return <Loader message="Cangando información del voluntario"/>;
  if (isError) return 'Error'; //<Navigate to="/404" />
  if (data) return <EditVolunteerForm data={data} volunteerId={Number(volunteerId)} />
}