namespace BlogApi
{
  using System;
  public static class Util
  {
    public static long ToJSTime(DateTime time)
    {
      return (long)(time - DateTime.UnixEpoch).TotalMilliseconds;
    }

    public static DateTime FromJSTime(long timestamp)
    {
      return DateTimeOffset.FromUnixTimeMilliseconds(timestamp).DateTime;
    }
  }
}
