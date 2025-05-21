import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';
import { ActiveOperation, StatusEnum } from '@/types/operation.schema';
import {
  RiEdit2Line,
  RiEyeLine,
  RiListCheck3,
} from '@remixicon/react';

export const ActionsColumn = ({
  row,
}: {
  row: { original: ActiveOperation };
}) => {
  const operation = row.original;
  const isDisabled = operation.status === StatusEnum.Disabled;

  const items = isDisabled
    ? [
        {
          type: 'link' as const,
          label: 'Ver operación',
          href: `/operation/${operation.operationId}`,
          icon: <RiEyeLine size={20} />,
        },
      ]
    : [
        {
          type: 'link' as const,
          label: 'Editar operación',
          href: `/operation/${operation.operationId}/edit`,
          icon: <RiEdit2Line size={20} />,
        },
        {
          type: 'link' as const,
          label: 'Ver operación',
          href: `/operation/${operation.operationId}`,
          icon: <RiEyeLine size={20} />,
        },
        {
          type: 'link' as const,
          label: 'Finalizar operación',
          href: `/operation/${operation.operationId}/absence`,
          icon: <RiListCheck3 size={20} />,
        },
      ];

  return <DropdownMenu items={items} />;
};
