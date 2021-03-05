using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [StringLength(16, MinimumLength = 4)]
        public string UserName { get; set; }
        
        [Required]
        [StringLength(16, MinimumLength = 4)]
        public string Password { get; set; }
    }
}