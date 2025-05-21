import { MovementHistoricalColumnsDef as columns } from "@/constants/inventory/MovementHistoricalColumnsDef";
import { MovementHistoricalListComponent } from "@/components/inventory/MovementHistoricalListComponent";

export default function MovementHistoricalView() {
  return (
    <MovementHistoricalListComponent
      breadcrumb={[
        { label: "Inventario", path: "/inventory/list" },
        { label: "Historial de movimientos" }
      ]}
      columns={columns}
    />
  );
}