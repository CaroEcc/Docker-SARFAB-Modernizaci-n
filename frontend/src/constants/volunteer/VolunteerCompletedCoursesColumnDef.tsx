import { ColumnDef } from "@tanstack/react-table";
import { VolunteerCompletedCourse } from "@/types/courseVolunteer.schema";

export const volunteerCompletedCoursesColumnsDef: ColumnDef<VolunteerCompletedCourse>[] = [
    { header: "Curso", accessorKey: "courseName" },
    { header: "Fecha de finalización", accessorKey: "completionDate" },
    { header: "Descripción", accessorKey: "description" }
];