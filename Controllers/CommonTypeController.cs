using CRM.Repository;
using CRM.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonTypeController(ICommonTypeRepository commonTypeRepository) : ControllerBase
    {
        private readonly ICommonTypeRepository _commonTypeRepository = commonTypeRepository;

        [HttpGet("getGenderList")]
        public IActionResult GetGenderList()
        {
            return Ok(_commonTypeRepository.GetChildByParentCode(CommonTypeCode.Gender));
        }

        [HttpGet("getPartyTypeList")]
        public IActionResult GetPartyTypeList()
        {
            return Ok(_commonTypeRepository.GetChildByParentCode(CommonTypeCode.PartyType));
        }
    }
}
