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
            CreateMap<BlogPost, BlogPostDTO>().ReverseMap();
            CreateMap<Album, AlbumDTO>().ReverseMap();
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
            CreateMap<MediaDTO, Media>()
                .ConvertUsing<MediaCreator>();
        }
    }

    public class MediaCreator : ITypeConverter<MediaDTO, Media>
    {
        public Media Convert(MediaDTO source, Media destination, ResolutionContext context)
        {
            Media media = source.TypeDiscriminator switch
            {
                1 => new Picture(),
                2 => new Model3D(),
                3 => new Music(),
                _ => throw new System.Exception()
            };

            return media;
        }
    }
}