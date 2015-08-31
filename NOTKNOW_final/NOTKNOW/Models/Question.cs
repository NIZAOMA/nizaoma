using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Question
    {
        [Key]
        public int QID { get; set; }

        [Required]
        public string QContent { get; set; }

        public string QDescription { get; set; }

        [Required]
        public int QTopicType1 { get; set; }

        [Required]
        public int QUserID { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime QTime { get; set; }

        [Required]
        public int QAnswerNum { get; set; }

        [Required]
        public int QViewNum { get; set; }

        [Required]
        public int QFollowNum { get; set; }

        [Required]
        public string QState { get; set; }
    }
}