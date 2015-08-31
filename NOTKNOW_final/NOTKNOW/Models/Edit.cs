using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class Edit
    {
        [Key]
        public int EID { get; set; }

        [Required]
        public int EQID { get; set; }

        [Required]
        public int EUID { get; set; }

        [Required]
        public string EContent { get; set; }

        [MaxLength(50)]
        public string EReason { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime ETime { get; set; }
    }
}