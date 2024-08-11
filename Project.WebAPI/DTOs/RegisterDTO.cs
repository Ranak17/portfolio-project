﻿using System.ComponentModel.DataAnnotations;

namespace Project.WebAPI.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]

        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }
        
        [Required]
        public string Username { get; set; }
    }
}
