using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Medical;
using Modernization_SARFAB_Backend.Application.Interfaces.Notifications;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Inventory;
using Modernization_SARFAB_Backend.Application.Services.Operations;
using Modernization_SARFAB_Backend.Application.Services.Medical;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using Modernization_SARFAB_Backend.Application.UseCases.Authentication;
using Modernization_SARFAB_Backend.Application.UseCases.Inventory;
using Modernization_SARFAB_Backend.Application.UseCases.Operations;
using Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.UseCases.Medical;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Infrastructure.Persistence;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Authentication;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Inventory;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Medical;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Infrastructure.Services;
using Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Services.Notifications;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Services.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Services.User;
using Modernization_SARFAB_Backend.Application.UseCases.DataContext;
using Modernization_SARFAB_Backend.Application.UseCases.Notifications;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Notifications;
using Modernization_SARFAB_Backend.Infrastructure.Services.Background;

namespace Modernization_SARFAB_Backend.Infrastructure.Dependencies
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // DbContext
            services.AddDbContext<SARFABSystemDbContext>(options =>
                options.UseMySql(
                    configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection")),
                    mySqlOptions => mySqlOptions.EnableRetryOnFailure()));

            // Authentication
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITokenService, JwtService>();
            services.AddScoped<LoginUseCase>();
            services.AddScoped<GetAuthenticatedUserUseCase>();

            services.AddScoped<GetUserByIdUseCase>();
            services.AddScoped<GetUsersUseCase>();
            services.AddScoped<CreateUserUseCase>();
            services.AddScoped<UpdateUserUseCase>();
            services.AddScoped<ChangePasswordUseCase>();
            services.AddScoped<PasswordRecoveryByAdminUseCase>();
            services.AddScoped<PasswordRecoveryByUserUseCase>();
            services.AddScoped<UpdateUserStatusUseCase>();
            services.AddScoped<UserChangePasswordUseCase>();

            services.AddScoped<UserApplicationService>();

            // Personnel - Volunteer Management
            services.AddScoped<IVolunteerRepository, VolunteerRepository>();
            services.AddScoped<CreateVolunteerUseCase>();
            services.AddScoped<ListActiveVolunteersUseCase>();
            services.AddScoped<GetVolunteerByIdUseCase>();
            services.AddScoped<UpdateVolunteerUseCase>();
            services.AddScoped<HistoricalListVolunteerUseCase>();
            services.AddScoped<UpdateVolunteerStatusUseCase>();
            services.AddScoped<GetAllVolunteerGradesUseCase>();

            services.AddScoped<VolunteerAplicationService>();
            
            // Personnel - Volunteer Operation Management
            services.AddScoped<IVolunteerOperationRepository, VolunteerOperationRepository>();
            services.AddScoped<GetVolunteerOperationsReportUseCase>();
            
            services.AddScoped<VolunterOperationApplicationService>();

            // Personnel - Volunteer Grade Promotion
            services.AddScoped<IVolunteerGradePromotionRepository, VolunteerGradePromotionRepository>();
            services.AddScoped<PromoteVolunteerUseCase>();

            services.AddScoped<VolunteerGradePromotionApplicationService>();

            // Personnel - Volunteer Course Management
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<GetVolunteerLastCourseUseCase>();
            services.AddScoped<ListCoursesUseCase>();
            services.AddScoped<GetCourseByIdUseCase>();
            services.AddScoped<GetCoursesForSelectUseCase>();
            services.AddScoped<AssignVolunteerCourseUseCase>();
            services.AddScoped<GetCompletedCoursesByVolunteerUseCase>();
            services.AddScoped<CreateCourseUseCase>();
            services.AddScoped<UpdateCourseUseCase>();
            services.AddScoped<AssignMultipleVolunteersToCourseUseCase>();

            services.AddScoped<CourseApplicationService>();

            // Personnel - Volunteer Demerit Point Management
            services.AddScoped<IDemeritPointRepository, DemeritPointRepository>();
            services.AddScoped<GetTotalPointsLostUseCase>();
            services.AddScoped<GetListLostPointsUseCase>();
            services.AddScoped<CreateDemeritPointUseCase>();
            services.AddScoped<DeleteDemeritPointUseCase>();

            services.AddScoped<DemeritPointApplicationService>();

            // Personnel - Volunteer Medical Checkup Management
            services.AddScoped<IMedicalCheckupRepository, MedicalCheckupRepository>();
            services.AddScoped<VolunteerMedicalChecklistUseCase>();
            services.AddScoped<GetMedicalCheckById>();
            services.AddScoped<CreateMedicalCheckupUseCase>();
            services.AddScoped<UpdateMedicalCheckupUseCase>();

            services.AddScoped<MedicalCheckupApplicationService>();

            // Personnel - Recruitment Management
            services.AddScoped<IRecruitmentRepository, RecruitmentRepository>();
            services.AddScoped<GetAllRecruitmentUseCase>();
            services.AddScoped<CreateRecruitmentUseCase>();
            services.AddScoped<UpdateRecruitmentUseCase>();
            services.AddScoped<GetRecruitmentByIdUseCase>();
            services.AddScoped<UpdateRecruitmentStatusUseCase>();

            services.AddScoped<RecruitmentApplicationService>();

            // Personnel - Military Management
            services.AddScoped<IMilitaryRepository, MilitaryRepository>();
            services.AddScoped<GetAllMilitaryUseCase>();
            services.AddScoped<CreateMilitaryUseCase>();
            services.AddScoped<UpdateMilitaryUseCase>();
            services.AddScoped<GetMilitaryByIdUseCase>();
            services.AddScoped<UpdateMilitaryStatusUseCase>();
            services.AddScoped<GetAllMilitaryRanksUseCase>();

            services.AddScoped<MilitaryApplicationService>();

            // Personnel - Military Rank Assignment Management
            services.AddScoped<IMilitaryRankAssignmentRepository, MilitaryRankAssignmentRepository>();
            services.AddScoped<PromoteMilitaryUseCase>();

            services.AddScoped<MilitaryRankAssignmentApplicationService>();
            
            // Operation Management
            services.AddScoped<ISarOperationRepository, SarOperationRepository>();
            services.AddScoped<CreateSarOperationUseCase>();
            services.AddScoped<UpdateSarOperationUseCase>();
            services.AddScoped<GetActiveOperationsUseCase>();
            services.AddScoped<UpdateOperationStatusUseCase>();
            services.AddScoped<GetOperationDetailUseCase>();
            services.AddScoped<GetDataMarkAbsenceUseCase>();
            services.AddScoped<UpdateStatusPersonOperationUseCase>();
            
            services.AddScoped<SarOperationApplicationService>();
            
            // Operation Context Data
            services.AddScoped<IContextDataRepository, ContextDataRepository>();
            services.AddScoped<GetOperationContextDataUseCase>();
            services.AddScoped<GetVolunteersWithRankUseCase>();
            services.AddScoped<GetMilitaryPersonnelWithRankUseCase>();
            services.AddScoped<GetOperationListFilterDataUseCase>();
            services.AddScoped<GetOperationCategoryUseCase>();
            services.AddScoped<GetDepartmentsUseCase>();
            services.AddScoped<GetVolunteersWithoutCourse>();
            
            services.AddScoped<ContextDataApplicationService>();

            // Operation Guard management
            services.AddScoped<IGuardRepository, GuardRepository>();
            services.AddScoped<GetGuardByIdUseCase>();
            services.AddScoped<GetGuardsUseCase>();
            services.AddScoped<CreateGuardUseCase>();
            services.AddScoped<UpdateGuardUseCase>();
            services.AddScoped<EndGuardUseCase>();
            services.AddScoped<GetGuardsByVoluntareeIdUseCase>();

            services.AddScoped<GuardAplicationService>();

            // Operation Guard management Shift
            services.AddScoped<IShiftRepository, ShiftRepository>();
            services.AddScoped<GetShiftUseCase>();

            services.AddScoped<ShiftAplicationService>();
            
            // Category Operation Management
            services.AddScoped<IOperationCategoryRepository, OperationCategoryRepository>();
            services.AddScoped<CreateOperationCategoryUseCase>();
            services.AddScoped<UpdateOperationCategoryUseCase>();
            services.AddScoped<GetCategoriesWithTypesUseCase>();
            
            services.AddScoped<OperationCategoryApplicationService>();
            
            // Type Operation Management
            services.AddScoped<IOperationTypeRepository, OperationTypeRepository>();
            services.AddScoped<CreateOperationTypeUseCase>();
            services.AddScoped<UpdateOperationTypeUseCase>();
            
            services.AddScoped<OperationTypeApplicationService>();
            
            // Requester Management
            services.AddScoped<IRequesterRepository, RequesterRepository>();
            services.AddScoped<GetRequestersUseCase>();
            
            // Item Management
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<CreateItemUseCase>();
            services.AddScoped<UpdateItemUseCase>();
            services.AddScoped<GetItemByIdWithPendingTableUseCase>();
            services.AddScoped<GetInventoryItemsUseCase>();
            services.AddScoped<ExtractItemUseCase>();
            services.AddScoped<ReturnItemUseCase>();
            services.AddScoped<ExtractBatchItemsUseCase>();
            services.AddScoped<ReturnBatchItemsUseCase>();
            services.AddScoped<GetItemByIdUseCase>();
            services.AddScoped<GetVolunteerPendingReturnsUseCase>();
            services.AddScoped<GetAllItemsUseCase>();
            services.AddScoped<GetItemsOwedByVolunteerUseCase>();
            services.AddScoped<GetMovementHistoryUseCase>();
            services.AddScoped<GetAllVolunteerPendingReturnsUseCase>();
            
            services.AddScoped<ItemApplicationService>();
            
            // Unit of Work
            services.AddScoped<IUnitOfWork, UnitOfWork>();


            // Medical - Medical treatment management
            services.AddScoped<IMedicalTreatmentRepository, MedicalTreatmentRepository> ();
            services.AddScoped<CreateMedicalTreatmentUseCase>();
            services.AddScoped<UpdateMedicalTreatmentUseCase>();
            services.AddScoped<GetMedicalTreatmentByIdUseCase>();
            services.AddScoped<GetMedicalTreatmentUseCase>();
            services.AddScoped<MedicalTreatmentApplicationService>();

            // Manejo de logs
            services.AddScoped<ILoggingService, LoggingService>();
            
            // Notifications
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<VerifyDemeritPointsUseCase>();
            services.AddScoped<VerifyMedicalCheckupsUseCase>();
            services.AddScoped<NotificationApplicationService>();
            
            services.AddHostedService<NotificationBackgroundService>();

            // Para el uso de UserContextService
            services.AddHttpContextAccessor();
            services.AddScoped<UserContextService>();

            // Para el envio de correos
            services.AddScoped<IEmailService, EmailService>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            });
            return services;
        }
    }
}