﻿using CRM.Data.Models;
using CRM.ViewModels;

namespace CRM.Repository.Interface
{
    public interface IUserProfileRepository
    {
        CustomerProfileViewModel CreateUserProfile (CustomerProfileViewModel viewModel);
        List<CustomerProfile> GetUserProfile(int userId);
    }
}
