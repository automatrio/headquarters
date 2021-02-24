using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [MinLength(4)]
        [MaxLength(16)]
        public string UserName { get; set; }
        
        [Required]
        [MinLength(4)]
        [MaxLength(16)]
        public string Password { get; set; }
    }
}