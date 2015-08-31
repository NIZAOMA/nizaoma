using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Save
    {
        [Key]
        public int SID { get; set; }

        [Required]
        public int SUserID { get; set; }

        [Required]
        public int SAnswerID { get; set; }
    }
}