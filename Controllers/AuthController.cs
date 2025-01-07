using CRM.Data;
using CRM.Data.Models;
using CRM.Repository;
using CRM.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDBContext db) : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly IConfiguration _configuration = configuration;
        private readonly ApplicationDBContext _db = db;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
                return BadRequest("Invalid input data.");

            var appuserID = _db.ApplicationUsers.OrderByDescending(x => x.AppUserID).Select(x => x.AppUserID).FirstOrDefault();
            appuserID = (appuserID == null || appuserID == 0) ? 1 : appuserID + 1;

            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                CreatedBy = TrackUser.AppUserID(),
                CreatedDateTime = DateTimeOffset.Now,
                AppUserID = appuserID
            };

            if (!await _roleManager.RoleExistsAsync(RoleName.User))
                return NotFound("The specified role does not exist.");

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, RoleName.User);
            if (!roleResult.Succeeded)
                return BadRequest(roleResult.Errors);

            await _db.SaveChangesAsync();

            return Ok("User created successfully.");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid credentials");

            var roles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new("AppUserID",user.AppUserID.ToString())
                //new(ClaimTypes.Role, assignRole),
            };
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
            var res = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                roles
            };
            return Ok(res);
        }

        [HttpPost("create-role")]
        public async Task<IActionResult> CreateRole([FromBody] string roleName)
        {
            if (string.IsNullOrEmpty(roleName))
                return BadRequest("Role name cannot be empty.");

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (roleExists)
                return BadRequest("Role already exists.");

            var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
            if (result.Succeeded)
                return Ok(new { Message = "Role created successfully!" });

            return BadRequest(result.Errors);
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] UserRoleModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return NotFound("User not found.");

            var roleExists = await _roleManager.RoleExistsAsync(model.RoleName);
            if (!roleExists)
                return NotFound("Role not found.");

            var result = await _userManager.AddToRoleAsync(user, model.RoleName);
            if (result.Succeeded)
                return Ok(new { Message = "Role assigned to user successfully!" });

            return BadRequest(result.Errors);
        }

        [HttpPost("remove-role")]
        public async Task<IActionResult> RemoveRole([FromBody] UserRoleModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return NotFound("User not found.");

            var result = await _userManager.RemoveFromRoleAsync(user, model.RoleName);
            if (result.Succeeded)
                return Ok(new { Message = "Role removed from user successfully!" });

            return BadRequest(result.Errors);
        }

        [HttpGet("user-roles/{email}")]
        public async Task<IActionResult> GetUserRoles(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound("User not found.");

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

    }
}
