using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Answer
    {
        [Key]
        public int AID { get; set; }

        [Required]
        public string AContent { get; set; }

        [Required]
        public int AQuestionID { get; set; }

        [Required]
        public int AUserID { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime ATime { get; set; }

        [Required]
        public int AUpvoteNum { get; set; }

        [Required]
        public int ADownvoteNum { get; set; }

        [Required]
        public int AUselessNum { get; set; }

        [Required]
        public int AReportNum { get; set; }

        [Required]
        public string AStatus { get; set; }

        [Required]
        public int ACommentNum { get; set; }
    }
}