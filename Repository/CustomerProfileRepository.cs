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
                FullName = EncryptionHelper.EncryptField(string.Concat(viewModel.FirstName, " ", viewModel.MiddleName, " ", viewModel.LastName)),
                AccountNumber = EncryptionHelper.EncryptField(viewModel.AccountNumber),
                AdditionalInformation = EncryptionHelper.EncryptField(viewModel.AdditionalInformation),
                EmailAddress = EncryptionHelper.EncryptField(viewModel.EmailAddress),
                PersonalEmail = EncryptionHelper.EncryptField(viewModel.PersonalEmail),
                BussinessEmail = EncryptionHelper.EncryptField(viewModel.BusinessEmail),
                PhoneNumber = EncryptionHelper.EncryptField(viewModel.PhoneNumber),
                MobilePhNo = EncryptionHelper.EncryptField(viewModel.MobilePhoneNumber),
                HomePhNo = EncryptionHelper.EncryptField(viewModel.HomePhoneNumber),
                BussinessPhNo = EncryptionHelper.EncryptField(viewModel.BusinessPhoneNumber),
                CtgenderId = viewModel.CtGenderId,
                CtpartyTypeId = viewModel.CtPartyTypeId,
                CreatedBy = TrackUser.AppUserID(),
                CreatedDateTime = DateTimeOffset.Now,
                DateOfBirth = viewModel.BirthDate,
                DomainName = EncryptionHelper.EncryptField(viewModel.DomainName)
            };
            _db.CustomerProfiles.Add(encryptedEntity);
            if (viewModel.MailingAddress is not null)
            {
                var encryptedAddress = new CustomerAddress()
                {
                    MailingStreetAddress = EncryptionHelper.EncryptField(viewModel.MailingAddress.Address1),
                    MailingAppSuite = EncryptionHelper.EncryptField(viewModel.MailingAddress.Address2),
                    MailingCountry = EncryptionHelper.EncryptField(viewModel.MailingAddress.Country),
                    MailingPostalCode = EncryptionHelper.EncryptField(viewModel.MailingAddress.PostalCode),
                    MailingStateProvince = EncryptionHelper.EncryptField(viewModel.MailingAddress.Province),
                    MailingCity = EncryptionHelper.EncryptField(viewModel.MailingAddress.City)
                };
                _db.CustomerAddresses.Add(encryptedAddress);
            }

            _db.SaveChanges();
            return viewModel;
        }
        public List<CustomerProfileViewModel> GetUserProfile(int userId)
        {
            var customerProfiles = _db.CustomerProfiles
                                    .Where(x => x.CreatedBy == userId)
                                    .ToList();

            var customerAddresses = _db.CustomerAddresses
                                    .Where(x => customerProfiles.Select(p => p.Id).Contains(x.CustomerProfileId))
                                    .ToList();

            var commonTypes = _db.CommonTypes.ToList();

            List<CustomerProfileViewModel> decryptedProfiles = customerProfiles.Select(profile =>
            {
                var address = customerAddresses.FirstOrDefault(a => a.CustomerProfileId == profile.Id);

                return new CustomerProfileViewModel
                {
                    FirstName = EncryptionHelper.DecryptField(profile.FirstName),
                    MiddleName = EncryptionHelper.DecryptField(profile.MiddleName),
                    LastName = EncryptionHelper.DecryptField(profile.LastName),
                    FullName = EncryptionHelper.DecryptField(profile.FullName),
                    AccountNumber = EncryptionHelper.DecryptField(profile.AccountNumber),
                    AdditionalInformation = EncryptionHelper.DecryptField(profile.AdditionalInformation),
                    EmailAddress = EncryptionHelper.DecryptField(profile.EmailAddress),
                    PersonalEmail = EncryptionHelper.DecryptField(profile.PersonalEmail),
                    BusinessEmail = EncryptionHelper.DecryptField(profile.BussinessEmail),
                    PhoneNumber = EncryptionHelper.DecryptField(profile.PhoneNumber),
                    MobilePhoneNumber = EncryptionHelper.DecryptField(profile.MobilePhNo),
                    HomePhoneNumber = EncryptionHelper.DecryptField(profile.HomePhNo),
                    BusinessPhoneNumber = EncryptionHelper.DecryptField(profile.BussinessPhNo),
                    CtGenderId = profile.CtgenderId,
                    CtPartyTypeId = profile.CtpartyTypeId,
                    GenderString = commonTypes.FirstOrDefault(x => x.Id == profile.CtgenderId)?.Name,
                    PartyTypeString = commonTypes.FirstOrDefault(x => x.Id == profile.CtpartyTypeId)?.Name,
                    CreatedBy = profile.CreatedBy,
                    CreatedDateTime = profile.CreatedDateTime,
                    UpdatedBy = profile.UpdatedBy,
                    UpdatedDateTime = profile.UpdatedDateTime,

                    MailingAddress = address != null
                        ? new Mailingaddress
                        {
                            Address1 = EncryptionHelper.DecryptField(address.MailingStreetAddress),
                            Address2 = EncryptionHelper.DecryptField(address.MailingAppSuite),
                            Country = EncryptionHelper.DecryptField(address.MailingCountry),
                            PostalCode = EncryptionHelper.DecryptField(address.MailingPostalCode),
                            Province = EncryptionHelper.DecryptField(address.MailingStateProvince),
                            City = EncryptionHelper.DecryptField(address.MailingCity)
                        }
                        : null
                };
            }).ToList();
            return decryptedProfiles;
        }
    }
}
