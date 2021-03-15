using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContentController : BaseApiController
    {
        public ContentController(DataContext context) : base(context)
        {
        }

        // [HttpPost]
        // public async void CreatePicture()
        // {
            
        // }
    }
}