import { useSearchParams } from "react-router-dom";
import VolunteerGuardsReport from "@/components/volunteer/views/VolunteerGuardsReport";
import { volunteerGuardsReportColumnsDef } from "@/constants/volunteer/VolunteerGuardsReportColumnDef";

export default function VolunteerGuardsReportView() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");

    const breadcrumb =
        from === "active"
            ? [
                  { label: "Voluntarios activos", path: "/volunteers/active-volunteers" },
                  { label: "Reporte de guardias" },
              ]
            : [
                  { label: "Voluntarios - Historico", path: "/volunteers/volunteer-history" },
                  { label: "Reporte de guardias" },
              ];

    return (
        <VolunteerGuardsReport
            breadcrumb={breadcrumb}
            columns={volunteerGuardsReportColumnsDef}
        />
    );
}
