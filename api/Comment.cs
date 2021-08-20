namespace Idrissi.Blogging
{
  using Newtonsoft.Json;

  public class Comment
  {
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("pageId")]
    public string PageId { get; set; }

    [JsonProperty("timestamp")]
    public long TimeStamp { get; set; }

    [JsonProperty("content")]
    public string Content { get; set; }

    [JsonProperty("userId")]
    public string UserId { get; set; }

    [JsonProperty("userName")]
    public string UserName { get; set; }

    [JsonProperty("deleted")]
    public bool Deleted { get; set; }
  }
}
