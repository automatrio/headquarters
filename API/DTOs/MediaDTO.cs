namespace API.DTOs
{
    public class MediaDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int BlogPostId { get; set; }
    }
}