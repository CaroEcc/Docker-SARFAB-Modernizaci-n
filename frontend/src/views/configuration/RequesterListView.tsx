import RequesterListComponent from "@/components/requester/RequesterListComponent";
import { requesterColumnsDef as columns } from "@/constants/requester/RequesterColumnsDef";

export default function RequesterListView() {
  return (
    <RequesterListComponent
      breadcrumb={[
        { label: 'Configuración', path: '/configuration/requester/list' },
        { label: 'Solicitantes' }
      ]}
      columns={columns}
    />
  );
}