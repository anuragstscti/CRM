using CRM.Data;
using CRM.Data.Models;
using CRM.Repository.Interface;
using CRM.ViewModels;
using Microsoft.AspNetCore.Components.Forms;

namespace CRM.Repository
{
    public class UserProfileRepository(ApplicationDBContext db) : IUserProfileRepository
    {
        private readonly ApplicationDBContext _db = db;

        public CustomerProfileViewModel CreateUserProfile(CustomerProfileViewModel viewModel)
        {
            var encryptedEntity = new CustomerProfile()
            {
                FirstName = EncryptionHelper.EncryptField(viewModel.FirstName),
                MiddleName = EncryptionHelper.EncryptField(viewModel.MiddleName),
                LastName = EncryptionHelper.EncryptField(viewModel.LastName),
                BussinessName = EncryptionHelper.EncryptField(viewModel.BussinessName),
                FullName = EncryptionHelper.EncryptField(string.Concat(viewModel.FirstName, viewModel.MiddleName, viewModel.LastName)),
                AccountNumber = EncryptionHelper.EncryptField(viewModel.AccountNumber),
                AdditionalInformation = EncryptionHelper.EncryptField(viewModel.AdditionalInformation),
                EmailAddress = EncryptionHelper.EncryptField(viewModel.EmailAddress),
                PhoneNumber = EncryptionHelper.EncryptField(viewModel.PhoneNumber),
                CreatedBy = TrackUser.AppUserID(),
                CreatedDateTime = DateTimeOffset.Now,
                DateOfBirth = viewModel.BirthDate,//EncryptionHelper.EncryptField(viewModel.BirthDate),
                //GenderString = EncryptionHelper.EncryptField(viewModel.GenderString),
                //PartyTypeString = EncryptionHelper.EncryptField(viewModel.PartyTypeString),
                //DomainName = EncryptionHelper.EncryptField(viewModel.DomainName)
                //MailingAddress = new Mailingaddress
                //{
                //    Address1 = EncryptionHelper.EncryptField(viewModel.MailingAddress.Address1),
                //    Address2 = EncryptionHelper.EncryptField(viewModel.MailingAddress.Address2),
                //    Country = EncryptionHelper.EncryptField(viewModel.MailingAddress.Country),
                //    PostalCode = EncryptionHelper.EncryptField(viewModel.MailingAddress.PostalCode),
                //    Province = EncryptionHelper.EncryptField(viewModel.MailingAddress.Province),
                //    City = EncryptionHelper.EncryptField(viewModel.MailingAddress.City)
                //},
            };
            _db.CustomerProfiles.Add(encryptedEntity);
            _db.SaveChanges();
            return viewModel;
        }
        public List<CustomerProfile> GetUserProfile(int userId)
        {
            //var res=_db.CustomerProfiles.Where(x=>x.CreatedBy==userId).ToList();
            var res = _db.CustomerProfiles.ToList();

            foreach (var item in res)
            {
                item.FirstName = EncryptionHelper.DecryptField(item.FirstName);
                item.MiddleName = EncryptionHelper.DecryptField(item.MiddleName);
                item.LastName = EncryptionHelper.DecryptField(item.LastName);
                item.BussinessName = EncryptionHelper.DecryptField(item.BussinessName);
                item.FullName = EncryptionHelper.DecryptField(string.Concat(item.FirstName, item.MiddleName, item.LastName));
                item.AccountNumber = EncryptionHelper.DecryptField(item.AccountNumber);
                item.AdditionalInformation = EncryptionHelper.DecryptField(item.AdditionalInformation);
                item.EmailAddress = EncryptionHelper.DecryptField(item.EmailAddress);
                item.PhoneNumber = EncryptionHelper.DecryptField(item.PhoneNumber);
            }
            return res;
        }
    }
}
