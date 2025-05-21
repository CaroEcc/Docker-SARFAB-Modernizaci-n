import VolunteerCourseAssingModal from '@/components/volunteer/modals/VolunteerCourseAssingModal';
import VolunteerGradePromotionModal from '@/components/volunteer/modals/VolunteerGradePromotionModal';
import VolunteerActiveListView from '@/components/volunteer/views/VolunteerActiveListView'
import { volunteerColumnsDef as columns } from "@/constants/volunteer/VolunteersActiveColumnDef";

export default function ActiveVolunteersView() {
  return (
    <VolunteerActiveListView
      breadcrumb={[{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Listado de voluntarios activos" }]}
      columns={columns}
      modalComponent={[<VolunteerCourseAssingModal/>, <VolunteerGradePromotionModal/>]}
    />
  )
}