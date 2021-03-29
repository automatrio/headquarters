using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Admin, PublicAdminDTO>();
            CreateMap<Picture, PictureDTO>();
            CreateMap<Model3D, Model3DDTO>();
            CreateMap<Music, MusicDTO>();
            CreateMap<Media, MediaDTO>();
            CreateMap<BlogPost, BlogPostDTO>();
        }
    }
}