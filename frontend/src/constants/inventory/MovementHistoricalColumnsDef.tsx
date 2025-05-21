import { MovementHistory } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MovementHistoricalColumns } from "./MovementHistoricalColumns";

export const MovementHistoricalColumnsDef: ColumnDef<MovementHistory>[] = [
  ...MovementHistoricalColumns,
];