namespace NOTKNOW.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFTTimeFQTimeFUTimeTPhoto : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Words",
                c => new
                    {
                        WID = c.Int(nullable: false, identity: true),
                        Wword = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.WID);
            
            AddColumn("dbo.Topics", "TPhoto", c => c.String(nullable: false));
            AddColumn("dbo.FollowQuestions", "FQTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.FollowUsers", "FUTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.FollowTopics", "FTTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.Questions", "QTopicType2");
            DropColumn("dbo.Questions", "QTopicType3");
            DropColumn("dbo.Questions", "QTopicType4");
            DropColumn("dbo.Questions", "QTopicType5");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Questions", "QTopicType5", c => c.Int(nullable: false));
            AddColumn("dbo.Questions", "QTopicType4", c => c.Int(nullable: false));
            AddColumn("dbo.Questions", "QTopicType3", c => c.Int(nullable: false));
            AddColumn("dbo.Questions", "QTopicType2", c => c.Int(nullable: false));
            DropColumn("dbo.FollowTopics", "FTTime");
            DropColumn("dbo.FollowUsers", "FUTime");
            DropColumn("dbo.FollowQuestions", "FQTime");
            DropColumn("dbo.Topics", "TPhoto");
            DropTable("dbo.Words");
        }
    }
}
