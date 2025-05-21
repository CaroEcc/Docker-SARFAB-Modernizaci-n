import { useState } from "react";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import {
  RiEdit2Line,
  RiArrowUpCircleLine,
  RiUserUnfollowLine,
  RiUserFollowLine,
} from "@remixicon/react";
import { Military } from "@/types/index";
import { MilitaryFormModal } from "@/components/military";
import { MilitaryStatusModal } from "@/components/military/modals/MilitaryStatusModal";
import { MilitaryPromoteModal } from "@/components/military/modals/MilitaryPromoteModal";

export const ActionsColumn = ({ row }: { row: { original: Military } }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);

  const handleEditClick = () => {
    if (!row.original.id) return;
    setIsEditModalOpen(true);
  };

  const handleStatusClick = () => {
    if (!row.original.id) return;
    setIsStatusModalOpen(true);
  };

  const isActive = row.original.status === 1;

  const menuItems = [
    {
      type: "button" as const,
      label: "Editar militar",
      onClick: handleEditClick,
      icon: <RiEdit2Line size={20} />,
    },
    {
      type: "button" as const,
      label: isActive ? "Desactivar militar" : "Activar militar",
      onClick: handleStatusClick,
      icon: isActive ? <RiUserUnfollowLine size={20} /> : <RiUserFollowLine size={20} />,
    },
  ];

  if (row.original.canPromote) {
    menuItems.push({
      type: "button" as const,
      label: "Ascender militar",
      onClick: () => setIsPromoteModalOpen(true),
      icon: <RiArrowUpCircleLine size={20} />,
    });
  }

  return (
    <>
      <DropdownMenu items={menuItems} />
      {isEditModalOpen && row.original.id && (
        <MilitaryFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          militaryId={row.original.id}
        />
      )}
      {isStatusModalOpen && row.original.id && (
        <MilitaryStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          militaryId={row.original.id}
          currentStatus={row.original.status}
        />
      )}
      {isPromoteModalOpen && row.original.id && (
        <MilitaryPromoteModal
          isOpen={isPromoteModalOpen}
          onClose={() => setIsPromoteModalOpen(false)}
          militaryId={row.original.id}
        />
      )}
    </>
  );
};
