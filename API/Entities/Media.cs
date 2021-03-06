namespace API.Entities
{
    public abstract class Media
    {
        public int Id { get; set; }
        public MediaType TypeDiscriminator { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public BlogPost BlogPost { get; set; }
        public int BlogPostId { get; set; }
    }
}

public enum MediaType
{
    Music,
    Picture,
    Model3D
}