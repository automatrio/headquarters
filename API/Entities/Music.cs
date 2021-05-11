namespace API.Entities
{
    public class Music : Media
    {
        public string PublicId { get; set; }
        public string Title { get; set; }
        public int Number { get; set; }
        public int Duration { get; set; }
        public Album Album { get; set; }
    }
}