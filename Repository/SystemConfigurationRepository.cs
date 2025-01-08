using CRM.Data;
using CRM.Repository.Interface;

namespace CRM.Repository
{
    public class SystemConfigurationRepository(ApplicationDBContext db) : ISystemConfigurationRepository
    {
        private readonly ApplicationDBContext _db = db;

        public string GetConfigurationDetails(string fieldText)
        {
            var rec = _db.SystemConfigurations.Where(x => x.Field == fieldText && !x.IsDeleted).Select(x => x.Value).FirstOrDefault();
            return rec;
        }
    }
}
