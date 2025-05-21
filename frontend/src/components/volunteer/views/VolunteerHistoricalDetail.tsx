import BackLink from "@/components/common/BackLink/BackLink";
import Loader from "@/components/common/Loader";
import SimpleSortableTable from "@/components/common/SimpleSortableTable/SimpleSortableTable";
import VolunteerCourseAssingModal from "@/components/volunteer/modals/VolunteerCourseAssingModal";
import VolunteerDischargeModal from "@/components/volunteer/modals/VolunteerDischargeModal";
import VolunteerGradePromotionModal from "@/components/volunteer/modals/VolunteerGradePromotionModal";
import VolunteerServiceCompletedModal from "@/components/volunteer/modals/VolunteerServiceCompletedModal";
import Assistance from "@/components/volunteer/sections/detailViewSections/Assistance";
import EmergencyData from "@/components/volunteer/sections/detailViewSections/EmergencyData";
import MedicalData from "@/components/volunteer/sections/detailViewSections/MedicalData";
import PersonalData from "@/components/volunteer/sections/detailViewSections/PersonalData";
import Reports from "@/components/volunteer/sections/detailViewSections/Reports";
import { volunteerHistoricalMedicalCheckupColumnsDef } from "@/constants/volunteer/VolunteerMedicalCheckupColumnDef";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useLastCourseVolunteer } from "@/hooks/courseVolunteer/querys/useLastCourseVolunteer";
import { useDetailsVolunteer } from "@/hooks/volunteer/querys/useEditVolunteerData";
import { useVolunteerTotalDemeritPoint } from "@/hooks/volunteer/querys/useVolunteerTotalDemeritPoint";
import { useVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/querys/useVolunteerMedicalCheckup";
import { useParams, useSearchParams } from "react-router-dom";

export default function VolunteerHistoricalDetail() {
  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/volunteer-history" }, { label: "Ver voluntario" }]);

  const params = useParams();
  const [searchParams] = useSearchParams();

  const reason = searchParams.get("reason");
  const departureDate = searchParams.get("departureDate");
  const volunteerStatus = searchParams.get("volunteerStatus");

  const volunteerId = params.volunteerId!;

  const { data, isLoading, isError } = useDetailsVolunteer(volunteerId);
  const { data: totalDemeritPoint, isLoading: isLoadingTotalDemeritPoint, isError: isErrorTotalDemeritPoint } = useVolunteerTotalDemeritPoint(volunteerId);
  const { data: medicalCheckupData, isLoading: isLoadingMedicalCheckupData, isError: isErrorMedicalCheckupData } = useVolunteerMedicalCheckup(volunteerId);
  const { data: lastCourseVolunteer, isError: isErrorLastCourse, error: errorLastCourse } = useLastCourseVolunteer(Number(volunteerId));

  const isLoadingAll = isLoading || isLoadingTotalDemeritPoint || isLoadingMedicalCheckupData;
  const isErrorAll = isError || isErrorTotalDemeritPoint || isErrorMedicalCheckupData;

  if (isLoadingAll) return <Loader message="Cargando información del voluntario" />;
  if (isErrorAll) return <div>Error al cargar los datos. Intenta nuevamente.</div>;

  return <>
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-none lg:grid-rows-4 lg:gap-5 gap-3">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-4 p-4">
        <BackLink
          text="Volver a listado de voluntarios"
          iconSize={20}
          link="/recruitment/approve-or-deny"
        />

        <PersonalData data={data} lastCourse={isErrorLastCourse ? errorLastCourse : lastCourseVolunteer?.courseName} />
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
          <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
            Información de baja
          </h3>
          <div className="flex flex-col gap-4 text-sm p-6.5">
            <div>
              <span className="font-bold">Razón:</span>{" "}
              {reason || "Sin razón registrada"}
            </div>

            <div>
              <span className="font-bold">Fecha de salida:</span>{" "}
              {departureDate || "No disponible"}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold">Estado:</span>
              {volunteerStatus === "0" && (
                <span className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-semibold text-danger">
                  BAJA
                </span>
              )}
              {volunteerStatus === "2" && (
                <span className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-semibold text-success">
                  CUMPLIÓ
                </span>
              )}
              {!["0", "2"].includes(volunteerStatus ?? "") && (
                <span className="inline-flex rounded-full bg-gray-400 bg-opacity-10 px-3 py-1 text-sm font-semibold text-gray-600">
                  Desconocido
                </span>
              )}
            </div>
          </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
        {totalDemeritPoint !== undefined && totalDemeritPoint !== null ? (
          <Assistance volunteerId={volunteerId} totalDemeritPoint={totalDemeritPoint} volunteerType={data.volunteerType}/>
        ) : (
          <div>Cargando puntos de demérito...</div> // O un mensaje de carga específico
        )}
      </div>

      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
        <Reports volunteerId={volunteerId} from="history" />
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-2 p-4">
        <EmergencyData data={data} />
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 lg:row-start-5 p-4">
        <MedicalData data={data} />
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:col-span-2 lg:row-span-1 lg:row-start-6 p-4">
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          Chequeos medicos
        </h3>
        {medicalCheckupData && (<SimpleSortableTable columns={volunteerHistoricalMedicalCheckupColumnsDef}
          data={medicalCheckupData}
          initialPageSize={10} />)}
      </div>
    </div >
    <VolunteerCourseAssingModal />
    <VolunteerGradePromotionModal />
    <VolunteerServiceCompletedModal />
    <VolunteerDischargeModal />
  </>
}