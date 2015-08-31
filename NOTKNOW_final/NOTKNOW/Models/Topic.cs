using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Topic
    {
        [Key]
        public int TID { get; set; }

        [Required]
        public string TContent { get; set; }

        public string TDescription { get; set; }

        [Required]
        public string TPhoto { get; set; }

        [Required]
        public int QuestionNum { get; set; }

        [Required]
        public int TStarQuestionNum { get; set; }

        [Required]
        public int TFollowerNum { get; set; }

        [Required]
        public int TFatherID { get; set; }
    }
}