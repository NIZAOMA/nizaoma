using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class FollowTopic
    {
        [Key]
        public int FTID { get; set; }

        [Required]
        public int FTUserID { get; set; }

        [Required]
        public int FollowingTID { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FTTime { get; set; }
    }
}