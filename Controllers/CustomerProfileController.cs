﻿using CRM.Repository.Interface;
using CRM.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerProfileController(ICustomerProfileRepository userProfileRepository) : ControllerBase
    {
        private readonly ICustomerProfileRepository _userProfileRepository = userProfileRepository;

        [HttpPost]
        public IActionResult CreateUserProfile(CustomerProfileViewModel viewModel)
        {
            _userProfileRepository.CreateUserProfile(viewModel);
            return Ok(viewModel);
        }

        [HttpGet("getCustomerProfileList/{userid}")]
        public IActionResult GetUserProfile(int userid)
        {
            var res = _userProfileRepository.GetUserProfile(0);
            return Ok(res);
        }
    }
}
