namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement
{
    public class UserDTO
    {
        public short UserId { get; set; }
        public int PersonId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public sbyte? status { get; set; }
    }
}
