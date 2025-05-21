using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Domain.Entities.Authentication
{
    public class UserEntity
    {
        public short Id { get; set; }
        public int PersonId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public sbyte? Role { get; set; }
        public sbyte? FirstLogin { get; set; }
        public sbyte? Status { get; set; }
        public PersonEntity Person { get; set; }

        public UserEntity() {}

        public UserEntity(short id, string username, string password, string email, PersonEntity person)
        {
            Id = id;
            Username = username;
            Password = password;
            Email = email;
            Person = person;
        }
    }
}
