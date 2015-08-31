using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Message
    {
        [Key]
        public int MID { get; set; }

        [Required]
        public int MType { get; set; }

        [Required]
        public int MFrom { get; set; }

        [Required]
        public int MTo { get; set; }

        [Required]
        public string MContent { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime MTime { get; set; }

        [Required]
        public string MStatus { get; set; }
    }
}