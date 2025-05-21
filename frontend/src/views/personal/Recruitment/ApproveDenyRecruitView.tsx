import RecruitContinueVolunteerModal from "@/components/recruitment/RecruitContinueVolunteerAfiliationModal";
import { RecruitmentListView } from "@/components/recruitment/RecruitmentListView";
import RecruitStatusModal from "@/components/recruitment/RecruitStatusModal";
import { RecruitmentApproveDenyColumnDef as columns } from "@/constants/recruitment/RecruitmentApproveDenyColumnDef";

export default function RecruitmentApproveDenyView() {

  return (
    <>
      <RecruitmentListView
        breadcrumb={[{ label: "Reclutamiento", path: "/recruitment/approve-or-deny" }, { label: "Aprobar / Rechazar reclutas" }]}
        initialStatusFilter="1"
        columns={columns}
        modalComponent={<RecruitStatusModal />}
      />
      <RecruitContinueVolunteerModal />
    </>
  );
}