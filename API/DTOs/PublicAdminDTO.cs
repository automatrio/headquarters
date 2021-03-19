using System.Collections.Generic;

namespace API.DTOs
{
    public class PublicAdminDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public ICollection<PictureDTO> Pictures { get; set; }
        public ICollection<MusicDTO> Music { get; set; }
        public ICollection<Model3DDTO> Models3D { get; set; }
    }
}