import DetailsRecruitModal from "@/components/recruitment/DetailsRecruitModal";
import { RecruitmentPendingListView } from "@/components/recruitment/RecruitmentPendingListView";
import { recruitmentColumnsDef as columns } from "@/constants/recruitment/RecruitmentColumnsDef";

export default function RecruitmentPendingView() {
    return (
        <RecruitmentPendingListView
            breadcrumb={[{ label: "Reclutamiento", path: "/recruitment/list" }, { label: "Listado de reclutas pendientes" }]}
            initialStatusFilter="2"
            columns={columns}
            modalComponent={<DetailsRecruitModal />}
        />
    );
}
