namespace API.Entities
{
    public class Music : Media
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public int Duration { get; set; }
        public string Album { get; set; }
    }
}