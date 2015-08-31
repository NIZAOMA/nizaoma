using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class User
    {
        [Key]
        public int UID { get; set; }

        [Required]
        [MaxLength(20)]
        public string UName { get; set; }

        [Required]
        [MaxLength(20)]
        public string UPassword { get; set; }

        [Required]
        [MaxLength(50)]
        public string UEmail { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        [Required]
        public string UPhoto { get; set; }

        [MaxLength(200)]
        public string UIntroduction { get; set; }

        [MaxLength(200)]
        public string UCareer { get; set; }

        [Required]
        public int UQuestionNum { get; set; }

        [Required]
        public int UAnswerNum { get; set; }

        [Required]
        public int UFollowerNum { get; set; }

        [Required]
        public int UFollowingNum { get; set; }

        [Required]
        public int UUpvoteNum { get; set; }

        [Required]
        public int UThanksNum { get; set; }

        [Required]
        public int UMessageNum { get; set; }

        [Required]
        public int UFTopicNum { get; set; }

        [Required]
        public int UFQuestionNum { get; set; }

        [Required]
        public int USaveNum { get; set; }
    }
}