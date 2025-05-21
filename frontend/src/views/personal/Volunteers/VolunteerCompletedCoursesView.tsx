import VolunteerCompletedCourses from "@/components/volunteer/views/VolunteerCompletedCourses";
import { volunteerCompletedCoursesColumnsDef } from "@/constants/volunteer/VolunteerCompletedCoursesColumnDef";

export default function VolunteerCompletedCoursesView() {
    return (
        <VolunteerCompletedCourses
            columns={volunteerCompletedCoursesColumnsDef}
        />
    )
}