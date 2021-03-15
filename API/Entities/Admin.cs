using System.Collections.Generic;

namespace API.Entities
{
    public class Admin
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<Picture> Pictures { get; set; }
        public ICollection<Music> Music { get; set; }
        public ICollection<Model3D> Models3D { get; set; }
        
    }
}