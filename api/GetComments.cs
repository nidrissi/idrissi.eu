using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Text.Json;

namespace Idrissi
{

    public static class GetComments
    {
        [FunctionName("GetComments")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "comment/{pageId}")]
            HttpRequest req,
            [CosmosDB(databaseName: "Blogging", collectionName: "Comments",
                ConnectionStringSetting = "CosmosDbConnectionString",
                SqlQuery = "select * from Blogging c where c.pageId = {pageId} order by c.date")]
            IEnumerable<Comment> comments,
            ILogger log)
        {
            var body = JsonSerializer.Serialize(comments);
            return new OkObjectResult(body);
        }
    }
}
