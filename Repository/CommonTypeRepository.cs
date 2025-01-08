using CRM.Data;
using CRM.Data.Models;
using CRM.Repository.Interface;
using CRM.ViewModels;

namespace CRM.Repository
{
    public class CommonTypeRepository(ApplicationDBContext db) : ICommonTypeRepository
    {
        private readonly ApplicationDBContext _db = db;

        public List<CommonTypeViewModel> GetChildByParentCode(string code)
        {
            var res = (from parent in _db.CommonTypes
                       join child in _db.CommonTypes on parent.Id equals child.Ctid
                       where parent.Code == code
                       select new CommonTypeViewModel
                       {
                           ID = child.Id,
                           Name = child.Name
                       }).ToList();
            return res;
        }
    }
}
