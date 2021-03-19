using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Models3D")]
    public class Model3D
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public string PublicID { get; set; }
        public Admin Admin { get; set; }
        public int AdminId { get; set; }
    }
}