import { RequesterType } from "@/types/requester.schema";
import { ColumnDef } from "@tanstack/react-table";

export const baseColumns: ColumnDef<RequesterType>[] = [
  { header: "Nombre del solicitante", accessorKey: "name" },
  { 
    header: "Teléfono", 
    accessorKey: "phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return phone ? phone : "Sin teléfono";
    }
  },
  { 
    header: "Celular", 
    accessorKey: "mobilePhone",
    cell: ({ row }) => {
      const mobilePhone = row.original.mobilePhone;
      return mobilePhone ? mobilePhone : "Sin celular";
    }
  }
];