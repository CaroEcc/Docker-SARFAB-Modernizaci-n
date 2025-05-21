import VolunteerReincorpotateModal from '@/components/volunteer/modals/VolunteerReincorporateModal';
import VolunteerHistoricalListView from '@/components/volunteer/views/VolunteerHistoricalListView';
import { volunteerColumnsDef as columns } from "@/constants/volunteer/VolunteersHistoricalColumnDef";

export default function HistoricalVolunteersView() {
    return (
        <VolunteerHistoricalListView
            breadcrumb={[{ label: "Voluntarios", path: "/volunteers/volunteer-history" }, { label: "Listado historico de voluntarios" }]}
            columns={columns}
            modalComponent={[<VolunteerReincorpotateModal/>]}
        />
    )
}