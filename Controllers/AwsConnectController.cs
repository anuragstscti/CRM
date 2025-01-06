using Amazon.Connect;
using Amazon.Runtime;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AwsConnectController : ControllerBase
    {
        public AwsConnectController()
        {
                
        }
        //public void ConnectAWS()
        //{
        //    var awsCredentials = new BasicAWSCredentials("ACCESS_KEY", "SECRET_KEY");
        //    var client = new AmazonConnectClient(awsCredentials, Amazon.RegionEndpoint.USEast1);
        //}
    }
}
