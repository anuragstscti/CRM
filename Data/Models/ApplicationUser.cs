using Microsoft.AspNetCore.Identity;

namespace CRM.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateOnly? DateOfBirth { get; set; }
        public int? AppUserID { get; set; }
        public int? CreatedBy { get; set; }
        public DateTimeOffset? CreatedDateTime { get; set; }
        public DateTimeOffset? UpdatedDateTime { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
