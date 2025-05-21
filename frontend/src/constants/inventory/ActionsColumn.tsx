import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';
import { InventoryItem } from '../../types/invetory.schema';
import { RiEdit2Line, RiEyeLine, RiInboxUnarchiveLine, RiInboxArchiveLine } from '@remixicon/react';
import { ReactElement } from 'react';

interface DropdownItem {
  type: 'link' | 'button';
  label: string;
  href?: string;
  icon?: ReactElement;
  onClick?: () => void;
  ref?: string;
  renderItem?: (active: boolean) => ReactElement;
}

export const ActionsColumn = ({ row }: { row: { original: InventoryItem }; }) => {
  const menuItems: DropdownItem[] = [
    {
      type: 'link',
      label: 'Editar elemento',
      href: `/inventory/list?openItemModal=true&itemId=${row.original.itemId}`,
      icon: <RiEdit2Line size={20} />,
    },
    {
      type: 'link',
      label: 'Ver elemento',
      href: `/inventory/${row.original.itemId}`,
      icon: <RiEyeLine size={20} />,
    }
  ];

  if (row.original.availableQuantity > 0) {
    menuItems.push({
      type: 'link',
      label: 'Registrar extracción',
      href: `?openItemMovementModal=true&itemId=${row.original.itemId}`,
      icon: <RiInboxUnarchiveLine size={20} />,
    });
  }

  if (row.original.assignedQuantity > 0) {
    menuItems.push({
      type: 'link',
      label: 'Registrar devolución',
      href: `?openItemMovementModal=true&itemId=${row.original.itemId}&isReturn=true`,
      icon: <RiInboxArchiveLine size={20} />,
    });
  }

  return (
    <>
      <DropdownMenu items={menuItems} />
    </>
  );
}