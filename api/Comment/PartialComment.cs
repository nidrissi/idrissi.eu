using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace BlogApi.Comment
{
  public class PartialComment
  {
    public string Content { get; set; }

    public bool TrimAndCheck(out string msg)
    {
      if (string.IsNullOrWhiteSpace(Content))
      {
        msg = "Empty post.";
        return false;
      }

      Content = Content.Trim();

      if (Content.Length < 10 || Content.Length > 512)
      {
        msg = "Bad length.";
        return false;
      }
      else
      {
        msg = null;
        return true;
      }
    }
  }
}
