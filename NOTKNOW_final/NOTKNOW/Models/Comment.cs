using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Comment
    {
        [Key]
        public int CID { get; set; }

        [Required]
        public int CUserID { get; set; }

        [Required]
        public int CAnswerID { get; set; }

        [Required]
        public string CContent { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CTime { get; set; }
    }
}