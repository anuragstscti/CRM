using CRM.Data;
using CRM.Data.Models;
using CRM.Repository.Interface;
using CRM.ViewModels;

namespace CRM.Repository
{
    public class CustomerProfileRepository(ApplicationDBContext db) : ICustomerProfileRepository
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
                FullName = EncryptionHelper.EncryptField(string.Concat(viewModel.FirstName, " ", viewModel.MiddleName, " ", viewModel.LastName)),
                AccountNumber = EncryptionHelper.EncryptField(viewModel.AccountNumber),
                AdditionalInformation = EncryptionHelper.EncryptField(viewModel.AdditionalInformation),
                EmailAddress = EncryptionHelper.EncryptField(viewModel.EmailAddress),
                PhoneNumber = EncryptionHelper.EncryptField(viewModel.PhoneNumber),
                CtgenderId = viewModel.CtGenderId,
                CtpartyTypeId = viewModel.CtPartyTypeId,
                CreatedBy = TrackUser.AppUserID(),
                CreatedDateTime = DateTimeOffset.Now,
                DateOfBirth = viewModel.BirthDate,
                DomainName = EncryptionHelper.EncryptField(viewModel.DomainName)
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
        public List<CustomerProfileViewModel> GetUserProfile(int userId)
        {
            var res = _db.CustomerProfiles.Where(x => x.CreatedBy == userId).ToList();
            List<CustomerProfileViewModel> decryptedProfiles = res.Select(profile => new CustomerProfileViewModel
            {
                FirstName = EncryptionHelper.DecryptField(profile.FirstName),
                MiddleName = EncryptionHelper.DecryptField(profile.MiddleName),
                LastName = EncryptionHelper.DecryptField(profile.LastName),
                BussinessName = EncryptionHelper.DecryptField(profile.BussinessName),
                FullName = string.Concat(EncryptionHelper.DecryptField(profile.FirstName),
                                         EncryptionHelper.DecryptField(profile.MiddleName),
                                         EncryptionHelper.DecryptField(profile.LastName)),

                AccountNumber = EncryptionHelper.DecryptField(profile.AccountNumber),
                AdditionalInformation = EncryptionHelper.DecryptField(profile.AdditionalInformation),
                EmailAddress = EncryptionHelper.DecryptField(profile.EmailAddress),
                PhoneNumber = EncryptionHelper.DecryptField(profile.PhoneNumber),
                CtGenderId = profile.CtgenderId,
                CtPartyTypeId = profile.CtpartyTypeId,
                GenderString = _db.CommonTypes.Where(x => x.Id == profile.CtgenderId).Select(x => x.Name).FirstOrDefault(),
                PartyTypeString = _db.CommonTypes.Where(x => x.Id == profile.CtpartyTypeId).Select(x => x.Name).FirstOrDefault(),
                CreatedBy = profile.CreatedBy,
                CreatedDateTime = profile.CreatedDateTime,
                UpdatedBy = profile.UpdatedBy,
                UpdatedDateTime = profile.UpdatedDateTime
            }).ToList();
            return decryptedProfiles;
        }
    }
}
