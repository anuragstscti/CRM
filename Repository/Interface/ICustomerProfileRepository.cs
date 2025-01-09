using CRM.ViewModels;

namespace CRM.Repository.Interface
{
    public interface ICustomerProfileRepository
    {
        CustomerProfileViewModel CreateUserProfile(CustomerProfileViewModel viewModel);
        List<CustomerProfileViewModel> GetUserProfile(int userId);
    }
}
