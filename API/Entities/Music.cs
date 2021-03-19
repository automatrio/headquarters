namespace API.Entities
{
    public class Music
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public string PublicID { get; set; }
        public Admin Admin { get; set; }
        public int AdminId { get; set; }
    }
}