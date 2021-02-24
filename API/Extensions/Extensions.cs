using System.Text;

namespace API.Extensions
{
    public static class Extensions
    {
        public static byte[] ToByteArray(this string str)
        {
            return Encoding.UTF8.GetBytes(str);
        }
    }
}