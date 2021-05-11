namespace API.DTOs
{
    public class MusicDTO : MediaDTO
    {
        public string PublicId { get; set; }
        public string Title { get; set; }
        public int Number { get; set; }
        public int Duration { get; set; }
        public AlbumDTO Album { get; set; }
    }
}