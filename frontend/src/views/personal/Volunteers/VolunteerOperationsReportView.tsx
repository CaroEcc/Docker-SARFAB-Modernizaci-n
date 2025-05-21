import VolunteerOperationsReport from "@/components/volunteer/views/VolunteerOperationsReport";
import { volunteerOperationsReportColumnsDef } from "@/constants/volunteer/VolunteerOperationsReportColumnDef";

export default function VolunteerOperationsReportView() {
    return (
        <VolunteerOperationsReport
            breadcrumb={[{ label: "Voluntarios", path: "/volunteers/volunteer-history" }, { label: "Reporte de operaciones" }]}
            columns={volunteerOperationsReportColumnsDef}
        />
    )
}