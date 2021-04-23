using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Site.Application.Interfaces;
using Site.Domain;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

namespace Site.Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUser> _userManager;
        public JwtGenerator(IConfiguration config, UserManager<AppUser> userManager)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            _userManager = userManager;
        }

        public string CreateToken(AppUser user)
        {   
            //Build claim - Return username and roles
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var roles = _userManager.GetRolesAsync(user).Result;

            foreach(var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            // generate signing creds - key must never leave server - come up with something better for deployment
            // Using to generate unique token
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);


            //Create token values
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
            
        }
    }
}
