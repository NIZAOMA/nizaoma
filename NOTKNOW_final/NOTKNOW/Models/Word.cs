using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Word
    {
        [Key]
        public int WID { get; set; }

        [Required]
        public String Wword { get; set; }
    }
}