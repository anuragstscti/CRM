namespace CRM.ViewModels
{
    public class CommonTypeViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CTID { get; set; }
        public string Keys { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
    }
}