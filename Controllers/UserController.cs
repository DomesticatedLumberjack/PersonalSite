using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Site.Application.Interfaces;
using Site.Application.Users;
using Site.Domain;

namespace Site.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == query.Email);

            if (user == null) return Unauthorized("Invalid email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, query.Password, false);

            if (result.Succeeded)
            {
                return new User
                {
                    DisplayName = user.DisplayName,
                    Token = _jwtGenerator.CreateToken(user),
                    Username = user.UserName,
                    Id = user.Id
                };
            }

            return Unauthorized("Invalid password");
        }
	/*
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            Console.WriteLine("Register recieved");
            return await Mediator.Send(command);
        }
	*/
    }
}
