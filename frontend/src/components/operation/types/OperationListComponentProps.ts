import { ActiveOperation } from "@/types/operation.schema";
import { ColumnDef } from "@tanstack/react-table";

export type OperationListComponentProps= {
    breadcrumb: { label: string; path?: string }[];
    initialStatusFilter: string;
    columns: ColumnDef<ActiveOperation>[];
}