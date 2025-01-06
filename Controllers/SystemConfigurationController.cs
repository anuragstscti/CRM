using CRM.Repository;
using CRM.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemConfigurationController(ISystemConfiguration systemConfiguration) : ControllerBase
    {
        private readonly ISystemConfiguration _systemConfiguration = systemConfiguration;

        [HttpGet("getCCPInstance")]
        public IActionResult GetCCPInstance()
        {
            var res =_systemConfiguration.GetConfigurationDetails(SystemConfigField.CCPInstance);
            return Ok(res);
        }
    }
}
