import VolunteerHistoryDemeritPoints from "@/components/volunteer/views/VolunteerHistoryDemeritPoints";
import { VolunteerHistoryDemeritPointsColumnDef } from "@/constants/volunteer/VolunteerHistoryDemeritPointsColumnDef";
export default function HistoryVolunteerDemeritPointsView() {
    return (
        <VolunteerHistoryDemeritPoints
            columns={VolunteerHistoryDemeritPointsColumnDef}
        />
    )
}