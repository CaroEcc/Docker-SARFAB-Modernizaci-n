import { ColumnDef } from "@tanstack/react-table";
import { Military } from "@/types/index";

export type MilitaryListViewProps = {
  breadcrumb: { label: string; path?: string }[];
  initialStatusFilter: string;
  columns: ColumnDef<Military>[];
};
