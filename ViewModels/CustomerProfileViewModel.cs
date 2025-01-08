﻿namespace CRM.ViewModels
{
    public class CustomerProfileViewModel
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string BussinessName { get; set; }
        public string GenderString { get; set; }
        public string PartyTypeString { get; set; }
        public DateOnly? BirthDate { get; set; }
        public string AccountNumber { get; set; }
        public string AdditionalInformation { get; set; }
        public string EmailAddress { get; set; }
        public Mailingaddress MailingAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string DomainName { get; set; }
    }

    public class Mailingaddress
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
    }
}