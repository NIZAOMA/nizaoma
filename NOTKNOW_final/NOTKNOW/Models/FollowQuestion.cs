using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class FollowQuestion
    {
        [Key]
        public int FQID { get; set; }

        [Required]
        public int FQUserID { get; set; }

        [Required]
        public int FollowingQID { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FQTime { get; set; }
    }
}