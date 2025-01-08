using CRM.ViewModels;

namespace CRM.Repository.Interface
{
    public interface ICommonTypeRepository
    {
        List<CommonTypeViewModel> GetChildByParentCode(string code);
    }
}
