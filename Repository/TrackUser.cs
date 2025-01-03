namespace CRM.Repository
{
    public class TrackUser
    {
        private static IHttpContextAccessor? _httpContextAccessor;
        private static readonly string EncryptionKey = "5DDBD030-8BAF-4205-B01F-30D461292658";
        public static void Initialize(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public static int AppUserID()
        {
            var appUserIdClaim = _httpContextAccessor?.HttpContext?.User?.FindFirst("AppUserID");
            if (appUserIdClaim != null && int.TryParse(appUserIdClaim.Value, out int appUserId))
            {
                return appUserId;
            }
            return 0;
        }
    }
}
