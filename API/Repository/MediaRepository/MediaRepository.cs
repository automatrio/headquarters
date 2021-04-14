using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.MediaRepository
{
    public class MediaRepository : IMediaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MediaRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<Media>> GetMediaByTypeAsync(string mediaType)
        {
            Type typeOfInstance = Type.GetType(mediaType);

            return await _context.Medias.Where(media => media.GetType() == typeOfInstance).ToListAsync();
        }

        public async Task<List<Media>> GetMediaByBlogAsync(int blogId)
        {
            return await _context.Medias.Where(media => media.BlogPostId == blogId).ToListAsync();
        }

        public async Task AttachNewMediaToBlogAsync(MediaDTO mediaDTO)
        {
            var blogPost = await _context.BlogPosts.FirstOrDefaultAsync(blogPost => blogPost.Id == mediaDTO.BlogPostId);

            var beans = new Music();

            Type typeOfInstance = Type.GetType("API.Entities." + mediaDTO.Type);

            var instance = (Media)Activator.CreateInstance(typeOfInstance);

            instance.Id = mediaDTO.Id;
            instance.Type = (MediaType)Enum.Parse(typeof(MediaType), mediaDTO.Type);
            instance.BlogPostId = mediaDTO.BlogPostId;
            instance.Description = mediaDTO.Description;
            instance.BlogPost = blogPost;
            instance.Url = mediaDTO.Url;

            if (blogPost.Media is not null)
            {
                blogPost.Media.Add(instance);
            }
            else
            {
                blogPost.Media = new List<Media>();
                blogPost.Media.Add(instance);
            }
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Media media)
        {
            _context.Entry(media).State = EntityState.Modified;
        }

        public async Task<MediaDTO> InsertNewMedia(MediaDTO media)
        {
            var newMedia = _mapper.Map<Media>(media);

            await _context.Medias.AddAsync(newMedia);

            return media;
        }
    }
}