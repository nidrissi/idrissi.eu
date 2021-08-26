
namespace BlogApi.Comment
{
  using System;
  using System.IO;
  using System.Threading.Tasks;
  using System.Threading;
  using Microsoft.AspNetCore.Http;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.Documents.Client;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.Extensions.Logging;
  using Newtonsoft.Json;

  public static class Patch
  {
    [FunctionName("Comment_PATCH")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "patch", Route = "comment/{pageId}/{commentId}")] HttpRequest req,
        string pageId,
        string commentId,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        CancellationToken token,
        ILogger log)
    {
      log.LogInformation("C# HTTP trigger function processed a request.");

      string name = req.Query["name"];

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      dynamic data = JsonConvert.DeserializeObject(requestBody);
      name = name ?? data?.name;

      string responseMessage = string.IsNullOrEmpty(name)
          ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
          : $"Hello, {name}. This HTTP triggered function executed successfully.";

      return new OkObjectResult(responseMessage);
    }
  }
}
