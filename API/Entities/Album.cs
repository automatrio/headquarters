using System.Collections.Generic;

namespace API.Entities
{
    public class Album
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Picture Cover { get; set; }
        public List<Music> Music { get; set; }
    }
}