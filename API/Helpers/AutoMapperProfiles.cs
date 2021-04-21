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
            CreateMap<Picture, PictureDTO>().ReverseMap();
            CreateMap<Model3D, Model3DDTO>().ReverseMap();
            CreateMap<Music, MusicDTO>().ReverseMap();
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