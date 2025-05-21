using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Authentication
{
    public class UserRepository : IUserRepository
    {
        private readonly SARFABSystemDbContext _context;

        public UserRepository(SARFABSystemDbContext context)
        {
            _context = context;
        }

        public async Task<UserEntity> GetByUsernameAsync(string username)
        {
            var model = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (model == null) throw new BusinessException("Usuario no encontrado");

            return new UserEntity{
                Id = model.UserId,
                Username = model.Username,
                Password = model.Password,
                Email = model.Email,
                Status = model.Status,
            };
        }

        public async Task<UserDTO> GetUserByUserIdAsync(int id)
        {
            var model = await _context.Users
                .Include(u => u.Person)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (model == null) throw new BusinessException("Usuario no encontrado");

            var dto = new UserDTO
            {
                UserId = model.UserId,
                PersonId = model.PersonId,
                UserName = model.Username,
                FullName = $"{model.Person.LastName} {model.Person.FirstName}",
                Email = model.Email,
                status = model.Status
            };

            return dto;
        }

        public async Task<(IEnumerable<UserDTO>, int totalPages)> GetUsersAsync(string? query, sbyte? status, int? pageZise, int? page)
        {
            // Valores predeterminados
            int pageNumber = page ?? 1;
            int pageSize = pageZise ?? 10;

            var queryable = _context.Users
                .Include(u => u.Person)
                .AsQueryable();

            queryable = queryable.OrderByDescending(o => o.CreatedAt);

            var totalRecords = await queryable.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            if (!string.IsNullOrEmpty(query))
            {
                queryable = queryable.Where(u =>
                    u.Person.FirstName.Contains(query) ||
                    u.Person.LastName.Contains(query));
            }

            // Filtro por rango de fechas
            if (status.HasValue)
            {
                queryable = queryable.Where(u => u.Status == status);
            }

            queryable = queryable.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            var models = await queryable.ToListAsync();

            // Mapeo a entidades
            var usersDTO = models.Select(u => new UserDTO
            {
                UserId = u.UserId,
                PersonId = u.PersonId,
                Email = u.Email,
                UserName = u.Username,
                FullName = $"{u.Person.LastName} {u.Person.FirstName}",
                status = u.Status
            });

            return (usersDTO, totalPages);
        }

        public async Task UpdateUserAsync(UserEntity userEntity)
        {
            var model = await _context.Users.FindAsync(userEntity.Id);
            if (model == null) throw new BusinessException("Usuario no encontrado");

            // Actualizar solo los campos permitidos
            if (!string.IsNullOrWhiteSpace(userEntity.Username))
                model.Username = userEntity.Username;

            if (!string.IsNullOrWhiteSpace(userEntity.Password))
                model.Password = userEntity.Password;

            if (!string.IsNullOrWhiteSpace(userEntity.Email))
                model.Email = userEntity.Email;

            if (userEntity.Role.HasValue)
                model.Role = (sbyte)userEntity.Role;

            if (userEntity.FirstLogin.HasValue)
                model.FirstLogin = (sbyte)userEntity.FirstLogin;

            if (userEntity.Status.HasValue)
                model.Status = userEntity.Status;

            // Guardar cambios en la base de datos
            _context.Users.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task<int> CreateUserAsync(UserEntity userEntity)
        {
            var findUser = await _context.Users.AnyAsync(u => u.Username == userEntity.Username);
            if (findUser) throw new BusinessException("El nombre de usuario ya esta registrado");

            var findEmail = await _context.Users.AnyAsync(u => u.Email == userEntity.Email);
            if (findEmail) throw new BusinessException("El correo electrónico ya esta registrado");

            var findPerson = await _context.Users.AnyAsync(u => u.PersonId == userEntity.PersonId);
            if (findPerson) throw new BusinessException("Esta persona ya esta registrada como usuario");

            var model = new User
            {
                PersonId = userEntity.PersonId,
                Username = userEntity.Username,
                Password = userEntity.Password,
                Email = userEntity.Email,
                Role = (sbyte)userEntity.Role,
            };

            await _context.Users.AddAsync(model);
            await _context.SaveChangesAsync();
            return model.UserId;
        }
        public async Task<UserEntity> GetByIdAsync(short userId)
        {
            var model = await _context.Users
                .Include(u => u.Person)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (model == null) return null;

            var userEntity = new UserEntity(
                model.UserId,
                model.Username,
                null,
                model.Email,
                new PersonEntity(model.Person.FirstName, model.Person.LastName)
            );

            userEntity.Role = (sbyte)model.Role;
            userEntity.FirstLogin = (sbyte)model.FirstLogin;

            return userEntity;
        }
    }
}
