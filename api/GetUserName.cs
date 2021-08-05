using System;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Idrissi.Blogging
{
    public class UserDetails
    {
        public string id { get; set; }
        public string userName { get; set; }
    }
    public static class GetUserName
    {
        [FunctionName("GetUserName")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "user")]
            HttpRequest req,
            [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")]
            DocumentClient client,
            ILogger log,
            CancellationToken token)
        {
            log.LogInformation("Parsing identity");
            var identity = Auth.Parse(req);

            if (!identity.IsInRole("authenticated"))
            {
                return new ForbidResult();
            }

            var userId = identity.FindFirst(ClaimTypes.NameIdentifier);

            if (String.IsNullOrWhiteSpace(userId.Value))
            {
                return new ForbidResult();
            }

            var userUri = UriFactory.CreateDocumentUri("Blogging", "Users", userId.Value);

            try
            {
                var partitionKey = new PartitionKey(userId.Value);
                var requestOptions = new RequestOptions() { PartitionKey = partitionKey };
                UserDetails details = await client.ReadDocumentAsync<UserDetails>(userUri, requestOptions, token);
                return new OkObjectResult(new { userId = userId.Value, userName = details.userName });
            }
            catch (DocumentClientException ex)
            {
                if (ex.StatusCode.HasValue)
                {
                    switch (ex.StatusCode.Value)
                    {
                        case HttpStatusCode.NotFound:
                            return new NotFoundResult();
                        case HttpStatusCode.TooManyRequests:
                            return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
                        default:
                            throw ex;
                    }
                }
                else
                {
                    throw ex;
                }
            }
        }
    }
}
