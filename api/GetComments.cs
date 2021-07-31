using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Text.Json;

namespace Idrissi.Blogging
{
    public static class GetComments
    {
        [FunctionName("GetComments")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "comment/{pageId}")]
            HttpRequest req,
            string pageId,
            [CosmosDB(databaseName: "Blogging", collectionName: "Comments",
                ConnectionStringSetting = "CosmosDbConnectionString")]
            DocumentClient client,
            ILogger log)
        {
            if (string.IsNullOrWhiteSpace(pageId))
            {
                return new NotFoundResult();
            }
            log.LogInformation($"Fetching comments for {pageId}");

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Comments");

            var comments = from c in client.CreateDocumentQuery<Comment>(collectionUri)
                           where c.pageId == pageId
                           orderby c.date descending
                           select c;
            var body = JsonSerializer.Serialize(comments);
            return new OkObjectResult(body);
        }
    }
}
