using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContentController : BaseApiController
    {
        private readonly DataContext _context;
        public ContentController(DataContext context)
        {
            _context = context;
        }

        // [HttpPost]
        // public async void CreatePicture()
        // {

        // }
    }
}