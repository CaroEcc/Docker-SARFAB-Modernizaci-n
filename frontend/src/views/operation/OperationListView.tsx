import { OperationListComponent } from "@/components/operation/OperationListComponent";
import { OperationColumnsDef as columns } from "@/constants/operation/OperationColumnsDef";

export default function OperationListView() {
    return (
        <OperationListComponent
            breadcrumb={[{ label: "Operaciones", path: "/operation/list" }, { label: "Lista de operaciones" }]}
            initialStatusFilter="1"
            columns={columns}
        />
    );
}