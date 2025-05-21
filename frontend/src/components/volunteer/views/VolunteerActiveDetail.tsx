import BackLink from "@/components/common/BackLink/BackLink";
import Loader from "@/components/common/Loader";
import SimpleSortableTable from "@/components/common/SimpleSortableTable/SimpleSortableTable";
import VolunteerCourseAssingModal from "@/components/volunteer/modals/VolunteerCourseAssingModal";
import VolunteerDischargeModal from "@/components/volunteer/modals/VolunteerDischargeModal";
import VolunteerGradePromotionModal from "@/components/volunteer/modals/VolunteerGradePromotionModal";
import VolunteerServiceCompletedModal from "@/components/volunteer/modals/VolunteerServiceCompletedModal";
import Actions from "@/components/volunteer/sections/detailViewSections/Acctions";
import Assistance from "@/components/volunteer/sections/detailViewSections/Assistance";
import EmergencyData from "@/components/volunteer/sections/detailViewSections/EmergencyData";
import MedicalData from "@/components/volunteer/sections/detailViewSections/MedicalData";
import PersonalData from "@/components/volunteer/sections/detailViewSections/PersonalData";
import Reports from "@/components/volunteer/sections/detailViewSections/Reports";
import { volunteerMedicalCheckupColumnsDef } from "@/constants/volunteer/VolunteerMedicalCheckupColumnDef";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useDetailsVolunteer } from "@/hooks/volunteer/querys/useEditVolunteerData";
import { useVolunteerTotalDemeritPoint } from "@/hooks/volunteer/querys/useVolunteerTotalDemeritPoint";
import { useVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/querys/useVolunteerMedicalCheckup";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VolunteerMedicalCheckupModal from "../modals/VolunteerMedicalCheckupModal";
import VolunteerEditMedicalCheckupModal from "../modals/VolunteerEditMedicalCheckupModal";
import { useLastCourseVolunteer } from "@/hooks/courseVolunteer/querys/useLastCourseVolunteer";

export default function VolunteerActiveDetail() {
  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Ver voluntario" }]);
  const [, setModalAction] = useState<string | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  const volunteerId = params.volunteerId!;

  const { data, isLoading, isError } = useDetailsVolunteer(volunteerId);
  const { data: totalDemeritPoint, isLoading: isLoadingTotalDemeritPoint, isError: isErrorTotalDemeritPoint } = useVolunteerTotalDemeritPoint(volunteerId);
  const { data: medicalCheckupData, isLoading: isLoadingMedicalCheckupData, isError: isErrorMedicalCheckupData } = useVolunteerMedicalCheckup(volunteerId);
  const { data: lastCourseVolunteer, isLoading: isLoadingLastCourse, isError: isErrorLastCourse, error: errorLastCourse } = useLastCourseVolunteer(Number(volunteerId));

  const isLoadingAll = isLoading || isLoadingTotalDemeritPoint || isLoadingMedicalCheckupData || isLoadingLastCourse;
  const isErrorAll = isError || isErrorTotalDemeritPoint || isErrorMedicalCheckupData;

  if (isLoadingAll) return <Loader message="Cargando información del voluntario" />;
  if (isErrorAll) return <div>Error al cargar los datos. Intenta nuevamente.</div>;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-none lg:grid-rows-4 lg:gap-5 gap-3">
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:row-span-1 md:row-span-2 lg:row-span-4 p-4">
          <BackLink
            text="Volver a listado de voluntarios"
            iconSize={20}
            link="/volunteers/active-volunteers"
          />
          <PersonalData data={data} lastCourse={isErrorLastCourse ? (typeof errorLastCourse === "object" && errorLastCourse !== null && "message" in errorLastCourse
            ? (errorLastCourse as any).message
            : "No se encontro el ultimo curso completado. Intenta nuevamente.") : lastCourseVolunteer?.courseName} />
        </div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
          <Actions volunteerId={volunteerId} setModalAction={setModalAction} />
        </div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
          {totalDemeritPoint !== undefined && totalDemeritPoint !== null ? (
            <Assistance volunteerId={volunteerId} totalDemeritPoint={totalDemeritPoint} volunteerType={data.volunteerType} />
          ) : (
            <div>Cargando faltas...</div>
          )}
        </div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
          <Reports volunteerId={volunteerId} from="active" />
        </div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-2 p-4">
          <EmergencyData data={data} />
        </div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 lg:row-start-5 p-4">
          <MedicalData data={data} />
        </div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:col-span-2 lg:row-span-1 lg:row-start-6 p-4">
          <div className="flex items-center justify-between px-6.5 mt-3">
            <h3 className="text-2xl font-semibold text-black dark:text-white">
              Chequeos médicos
            </h3>
            <button
              className="bg-primary text-white rounded-lg px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base"
              onClick={() => navigate(`?add-medical-checkup=true&volunteerId=${volunteerId}`)}
            >
              Agregar Chequeo Médico
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mx-5">
            Solo puedes modificar el último chequeo médico.
          </p>
          {medicalCheckupData && (
            <SimpleSortableTable columns={volunteerMedicalCheckupColumnsDef} data={medicalCheckupData} initialPageSize={10} />
          )}
        </div>
      </div>
      <VolunteerCourseAssingModal />
      <VolunteerGradePromotionModal />
      <VolunteerServiceCompletedModal />
      <VolunteerDischargeModal />
      <VolunteerMedicalCheckupModal />
      <VolunteerEditMedicalCheckupModal />
    </>
  );
}