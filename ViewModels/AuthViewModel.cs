namespace CRM.ViewModels
{
    public class RegisterModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class UserRoleModel
    {
        public string Email { get; set; }
        public string RoleName { get; set; }
    }

}
