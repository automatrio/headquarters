namespace API.DTOs
{
    public class MusicDTO : MediaDTO
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public int Duration { get; set; }
        public string Album { get; set; }
    }
}