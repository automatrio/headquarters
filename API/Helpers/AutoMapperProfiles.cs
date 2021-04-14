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
            CreateMap<Comment, CommentDTO>()
                .ForMember(
                    destinationMember: commentDTO => commentDTO.ParentBlogPostId,
                    memberOptions: options => options.MapFrom(
                        comment => comment.ParentBlogPost.Id
                    )
                )
                .ForMember(
                    commendDTO => commendDTO.ParentCommentId,
                    options => options.MapFrom(
                        comment => comment.ParentComment.Id
                    )  
                );
            CreateMap<BlogPostEditDTO, BlogPost>();
        }
    }
}