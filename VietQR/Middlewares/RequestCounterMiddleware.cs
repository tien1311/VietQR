using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace VietQR_Online.Middlewares
{
    public class RequestCounterMiddleware
    {
        private readonly RequestDelegate _next;
        private static string _visitorCount;

        public RequestCounterMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            int visitors = 0;

            // Kiểm tra xem cookie có tồn tại không
            if (context.Request.Cookies.TryGetValue("visitorCount", out string value))
            {
                visitors = int.Parse(value);
            }

            // Tăng số lượng lượt truy cập và lưu cookie
            visitors++;
            context.Response.Cookies.Append("visitorCount", visitors.ToString());

            await _next(context);
        }
    }
}