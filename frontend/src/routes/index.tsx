import { lazy } from 'react';

const ActiveVolunteersView = lazy(() => import('@/views/personal/Volunteers/ActiveVolunteersView'));
const CreateAfiliationView = lazy(() => import('@/views/personal/Volunteers/CreateVolunteerAfiliationView'));
const HistoricalVolunteersView = lazy(() => import('@/views/personal/Volunteers/HistoricalVolunteersView'));
const EditVolunteerView = lazy(() => import('@/views/personal/Volunteers/EditVolunteerAfiliationView'));
const DetailsVolunteerView = lazy(() => import('@/views/personal/Volunteers/DetailVolunteerView'));
const ReportGuardsVolunteerView = lazy(() => import('@/views/personal/Volunteers/VolunteerGuardsReportView'));
const ReportOperationsVolunteerView = lazy(() => import('@/views/personal/Volunteers/VolunteerOperationsReportView'));
const HistoryVolunteerDemeritPointsView = lazy(() => import('@/views/personal/Volunteers/HistoryVolunteerDemeritPointsView'));
const CompletedCoursesVolunteerView = lazy(() => import('@/views/personal/Volunteers/VolunteerCompletedCoursesView'));


const NotificationListView = lazy(() => import('@/views/notification/NotificationListView'));

const RecruitmentPendingView = lazy(() => import('@/views/personal/Recruitment/RecruitmentPendingView'));
const CreateRecruitmentView = lazy(() => import('@/views/personal/Recruitment/CreateRecruitView'));
const EditRecruitmentView = lazy(() => import('@/views/personal/Recruitment/EditRecruitView'));
const ApproveDenyRecruitView = lazy(() => import('@/views/personal/Recruitment/ApproveDenyRecruitView'));


// Military
const MilitaryView = lazy(() => import('@/views/personal/military/MilitaryListView'));

// Operations
const OperationsView = lazy(() => import('@/views/operation/OperationListView'));
const CreateOperationView = lazy(() => import('@/views/operation/CreateOperationView'));
const EditOperationView = lazy(() => import('@/views/operation/EditOperationView'));
const OperationDetailsView = lazy(() => import('@/views/operation/DetailOperationView'));
const OperationAbsenceInfoView = lazy(() => import('@/views/operation/OperationAbsenceInfoView'));

// Inventory
const InventoryListView = lazy(() => import('@/views/inventory/InventoryListView'));
const MovementHistoricalView = lazy(() => import('@/views/inventory/MovementHistoricalView'));
const DetailItemWithTableView = lazy(() => import('@/views/inventory/DetailItemWithTableView'));
const BatchItemWithdrawalView = lazy(() => import('@/views/inventory/BatchItemWithdrawalView'));
const BatchItemReturnView = lazy(() => import('@/views/inventory/BatchItemReturnView'));

//Medical treatment
const MedicalTreatmentView = lazy(() => import('@/views/medical/MedicalTreatmentView'))
const CreateMedicalTreatmentView = lazy(() => import('@/views/medical/CreateMedicalTreatmentView'))
const EditMedicalTreatmentView = lazy(() => import('@/views/medical/EditMedicalTreatmentView'))
const MedicalTreatmenDetailstView = lazy(() => import('@/views/medical/MedicalTreatmentDetailsView'))

//Configuration
const OperationCategoryListView = lazy(() => import('@/views/configuration/OperationCategoryListView'));
const RequesterListView = lazy(() => import('@/views/configuration/RequesterListView'));

//Course
const CourseListView = lazy(() => import('@/views/course/CourseListView'));
const CourseDetailView = lazy(() => import('@/views/course/CourseDetailView'));
const AssignCourseVolunteersView = lazy(() => import('@/views/course/AssignCourseVolunteersView'));
//Guard
const GuardListView = lazy(() => import('@/views/guard/GuardListView'))
const CreateGuardFormView = lazy(() => import('@/views/guard/CreateGuardView'))
const GuardDetailsView = lazy(() => import('@/views/guard/GuardDetailsView'))
const EditGuardView = lazy(() => import('@/views/guard/EditGuardView'))
const AttendanceGuardView = lazy(() => import('@/views/guard/AttendanceControlGuardView'))

//User
const UserListView = lazy(() => import('@/views/user/UserListView'))

const coreRoutes = [
  {
    path: '/',
    title: 'Notificaciones',
    component: NotificationListView
  },
  {
    path: '/notificaciones',
    title: 'Notificaciones',
    component: NotificationListView
  },
  {
    path: '/recruitment/list',
    title: 'Reclutamiento',
    component: RecruitmentPendingView
  },
  {
    path: '/recruitment/approve-or-deny',
    title: 'Aprobar o rechazar recluta',
    component: ApproveDenyRecruitView
  },
  {
    path: '/recruitment/create',
    title: 'Registrar nuevo recluta',
    component: CreateRecruitmentView
  },
  {
    path: '/recruitment/:recruitId/edit',
    title: 'Editar recluta',
    component: EditRecruitmentView
  },
  // Volunteer 
  {
    path: '/volunteers/create',
    title: 'Crear nueva afiliación de voluntarios',
    component: CreateAfiliationView
  },
  {
    path: '/volunteers/:volunteerId/edit',
    title: 'Editar voluntario',
    component: EditVolunteerView
  },
  {
    path: '/volunteers/:volunteerId/view',
    title: 'Editar voluntario',
    component: DetailsVolunteerView
  },
  {
    path: '/volunteers/:volunteerId/report-operations',
    title: 'Reporte de operativos',
    component: ReportOperationsVolunteerView
  },
  {
    path: '/volunteers/:volunteerId/completed-courses',
    title: 'Cursos',
    component: CompletedCoursesVolunteerView
  },
  {
    path: '/volunteers/:volunteerId/demerit-points',
    title: 'Puntos de demérito',
    component: HistoryVolunteerDemeritPointsView
  }, 
  {
    path: '/volunteers/active-volunteers',
    title: 'Voluntarios activos',
    component: ActiveVolunteersView
  },
  {
    path: '/volunteers/volunteer-history',
    title: 'Historico de voluntarios',
    component: HistoricalVolunteersView
  },
  {
    path: '/volunteers/:volunteerId/report-guards',
    title: 'Reporte de guardias',
    component: ReportGuardsVolunteerView
  },
  // Military
  {
    path: '/military/list',
    title: 'Personal militar',
    component: MilitaryView
  },
  // Operations
  {
    path: '/operation/list',
    title: 'Operaciones',
    component: OperationsView
  },
  {
    path: '/operation/create',
    title: 'Crear operación',
    component: CreateOperationView
  },
  {
    path: '/operation/:operationId/edit',
    title: 'Editar operación',
    component: EditOperationView
  },
  {
    path: '/operation/:operationId',
    title: 'Detalles de la operación',
    component: OperationDetailsView
  }, {
    path: '/operation/:operationId/absence',
    title: 'Marcar asistencia',
    component: OperationAbsenceInfoView
  },
  // Inventory
  {
    path: '/inventory/list',
    title: 'Items en el inventario',
    component: InventoryListView
  },
  {
    path: '/inventory/movement-historical',
    title: 'Historial de movimientos',
    component: MovementHistoricalView
  },
  {
    path: '/inventory/:itemId',
    title: 'Detalles del item',
    component: DetailItemWithTableView
  },
  {
    path: '/inventory/batch-item-withdrawal',
    title: 'Retiro de items por lote',
    component: BatchItemWithdrawalView
  },
  {
    path: '/inventory/batch-item-return',
    title: 'Devolución de items por lote',
    component: BatchItemReturnView
  },
  //MedicalTreatments
  {
    path: '/medical-treatment/list',
    title: 'Tratamientos médicos',
    component: MedicalTreatmentView
  },
  {
    path: '/medical-treatment/create',
    title: 'Editar tratamiento médico',
    component: CreateMedicalTreatmentView
  },
  {
    path: '/medical-treatment/:medicalTreatmentId/edit',
    title: 'Editar tratamiento médico',
    component: EditMedicalTreatmentView
  },
  {
    path: '/medical-treatment/:medicalTreatmentId',
    title: 'Ver tratamiento médico',
    component: MedicalTreatmenDetailstView
  },
  //Configuration
  {
    path: '/configuration/operation-category/list',
    title: 'Categorías de operación',
    component: OperationCategoryListView
  },
  {
    path: '/configuration/requester/list',
    title: 'Solicitantes',
    component: RequesterListView
  },
  //Course
  {
    path: '/courses/list',
    title: 'Cursos',
    component: CourseListView
  },
  {
    path: '/courses/:courseId',
    title: 'Ver curso',
    component: CourseDetailView
  },
  {
    path: '/courses/:courseId/assign-volunteers',
    title: 'Asignar voluntarios',
    component: AssignCourseVolunteersView
  },
  //Guards
  {
    path: '/guards/list',
    title: 'Guardias',
    component: GuardListView
  },
  {
    path: '/guards/create',
    title: 'Registrar guardias',
    component: CreateGuardFormView
  },
  {
    path: '/guards/:guardId',
    title: 'Ver guardia',
    component: GuardDetailsView
  },
  {
    path: '/guards/:guardId/edit',
    title: 'Editar guardia',
    component: EditGuardView
  },
  {
    path: '/guards/:guardId/attendance',
    title: 'Editar guardia',
    component: AttendanceGuardView
  },
  {
    path: '/administration/users',
    title: 'Lista de usuarios',
    component: UserListView
  }
]

const routes = [...coreRoutes];
export default routes;