using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class FollowUser
    {
        [Key]
        public int FUID { get; set; }

        [Required]
        public int FUUserID { get; set; }

        [Required]
        public int FollowingUID { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FUTime { get; set; }
    }
}