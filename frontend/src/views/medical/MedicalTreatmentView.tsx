import MedicalTreatmentListView from "@/components/medical/MedicalTreatmentListView";
import { medicalTreatmentColumnDef as columns } from "@/constants/medical/MedicalTreatmentColumnsDef";

export default function MedicalTreatmentView() {
    return (
        <MedicalTreatmentListView
            breadcrumb={[{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Listado de tratamientos médicos" }]}
            columns={columns}
        />
    );
}