using Microsoft.AspNetCore.Identity;

namespace Site.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName {get; set;}
    }
}