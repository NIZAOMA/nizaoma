using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    //将数据库中的数据进行封装，便于Controller层与view层传递

    public class UserModel
    {
        public User myUser;
        public IEnumerable<Question> questions;
        public IEnumerable<Answer> answers;
        public IEnumerable<Topic> topics;

    }

   
    public class QuestionModel
    {
        public Question question;
        public User myUser;
        public List<User> users;
        public List<Answer> answers;
        public List<CtoA> CA;
        public List<Topic> topics;
        public Topic topic;
    }


    public class CtoA
    {
        public int aID;
        public int uID;
        public IEnumerable<Comment> comments;
        public List<User> users;
    }


    public class TopicModel
    {
        public User myUser;
        public TopicPreNext topic;
        public TopicQuestion question;
        public List<TopicQuestion> childQuestion;
    }

    public class TopicPreNext
    {
        public Topic fatherTopic;
        public Topic topic;
        public List<Topic> childTopic;
    }

    public class TopicQuestion
    {
        public Topic topic;
        public List<Question> question;
        public List<Answer> HotAnswer;
        public List<User> HotUser;
    }

    public class TopicNewestModel
    {
        public User myUser;
        public TopicPreNext topic;
        public List<TopicInfo> question;
    }

    public class TopicInfo
    {
        public Topic topic;
        public Question question;
        public Answer hotAnswer;
        public User hotUser;
        public string timeSpan;
    }

    public class TopicStarModel
    {
        public User myUser;
        public TopicPreNext topic;
        public List<TopicInfo> question;
    }

    public class TopicAllModel
    {
        public User myUser;
        public TopicPreNext topic;
        public List<TopicAllQuestion> question;
    }

    public class TopicAllQuestion
    {
        public Topic topic;
        public Question question;
        public String timespan;
    }

    public class TopicSquare
    {
        public User myUser;
        public List<Topic> topic;
        public List<bool> focus;
    }

    public class FocusTopicModel
    {
        public User myUser;
        public List<TQ> focusTopic;
    }

    public class TQ
    {
        public Topic topic;
        public List<TimeQuestion> question;
    }

    public class TimeQuestion
    {
        public Question question;
        public String timespan;
    }

    public class IndexModel
    {
        public User myUser;
        public List<TopicInfo> info;
        public List<UserActivity> ua; 
    }
    public class TopicActivity
    {
        public Topic topic;
        public Question question;
        public Answer answer;
        public User user;
        public DateTime time;
        public char flag;//=q,很多人关注了问题,=a,很多人赞同了回答
    }
    public class UserActivity
    {
        public User keyUser;
        public Topic topic;
        public Question question;
        public Answer answer;
        public DateTime time;
        public string _time;
        public char flag;//a回答了问题，p提了一个问题，q关注了一个问题,t关注了一个话题


    }
    public class QAModel
    {
        public List<Question> question;
        public List<Answer> answer;
        public List<User> user;
    }
    public class ExploreModel
    {
        public User myUser;
        public QAModel recommendation;
        public QAModel dailyHot;
        public QAModel monthlyHot;
    }
    //TODO:wyt 单人对单人通讯
    public class MessagePack
    {
        public int id;
        public User me;
        public User friend;
        public List<Message> messages;
    }


    //一个人收到的所有讯息
    public class MessageModel
    {
        public List<MessagePack> packs;
        public List<User> toUser;
    }

    //发现本月最热和本日最热
    public class ExploreModels
    {
        public List<Answer> answer;
        public List<Question> question;
        public List<User> user;
    }

    public class SearchQuestionModel
    {
        public List<List<Question>> question;
        public List<List<Answer>> answer;
        public List<List<User>> user;
    }
    public class SearchTopicModel
    {
        public List<List<Topic>> topic;
    }

    public class AdminWordModel
    {
        public List<Word> word;
    }

    public class AdminQuestionModel
    {
        public List<Question> question;
        public List<User> user;
    }

    public class AdminAnswerModel
    {
        public List<Question> question;
        public List<Answer> answer;
        public List<User> user;
    }

    public class indexModel
    {
        public List<Topic> topics;
        public List<List<Question>> question;
    }

}