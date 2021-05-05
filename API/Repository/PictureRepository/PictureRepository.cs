using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.PictureRepository
{
    public class PictureRepository : IPictureRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PictureRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        public async Task AddPictureToBlogPostAsync(PictureDTO pictureDTO)
        {
            var blogPost = await _context.BlogPosts.FindAsync(pictureDTO.BlogPostId);
            var picture = _mapper.Map<Picture>(pictureDTO);
            blogPost.Media.Add(picture);
            _context.BlogPosts.Update(blogPost);
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeletePictureAsync(string publicId)
        {
            var photo = await _context.Medias
                .Where(media => media is Picture)
                .SingleOrDefaultAsync(picture => (picture as Picture).PublicId == publicId);
                
            _context.Medias.Remove(photo);

            await _context.SaveChangesAsync();
        }
    }
}