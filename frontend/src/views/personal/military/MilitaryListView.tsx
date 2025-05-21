import { MilitaryListComponent } from '@/components/military/views/MilitaryListComponent';
import { militaryColumnsDef as columns } from '@/components/military/table/militaryColumnsDef';

export default function MilitaryListView() {
  return (
    <MilitaryListComponent
      breadcrumb={[
        { label: 'Personal Militar', path: '/military/list' },
        { label: 'Listar personal militar' },
      ]}
      initialStatusFilter="1"
      columns={columns}
    />
  );
}
