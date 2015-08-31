using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NOTKNOW.Models
{
    public class WebDbContext : DbContext
    {
        public WebDbContext()
            : base("name=Website")
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Edit> Edits { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Save> Saves { get; set; }
        public DbSet<FollowQuestion> FollowQuestions { get; set; }
        public DbSet<FollowUser> FollowUsers { get; set; }
        public DbSet<FollowTopic> FollowTopics { get; set; }
        public DbSet<Word> Words { get; set; }
    }
}