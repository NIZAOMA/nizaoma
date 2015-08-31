using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    public class TopicController : Controller
    {
        //
        // GET: /Topic/
        private WebDbContext db = new WebDbContext();
        private Model model = new Model();

        public ActionResult Index()
        {
            FocusTopicModel t = new FocusTopicModel();
            t.myUser = db.Users.Find(getCookie("id"));
            t.focusTopic = new List<TQ>();
            List<FollowTopic> ft = new List<FollowTopic>();
            ft = db.FollowTopics.Where(a => a.FTUserID == t.myUser.UID).ToList();
            for (int i = 0; i < ft.Count(); i++)
            {
                TQ add = model.getTopThreeQuestionByTopicID(ft[i].FollowingTID);
                t.focusTopic.Add(add);
            }
            return View(t);
        }

        public ActionResult topics()
        {
            TopicSquare topics = new TopicSquare();
            topics.myUser = db.Users.Find(getCookie("id"));
            topics.topic = db.Topics.ToList();
            topics.focus = new List<bool>();
            for (int i = 0; i < topics.topic.Count(); i++)
            {
                int TID = topics.topic[i].TID;
                int TUID = topics.myUser.UID;
                IEnumerable<FollowTopic> IsFocus = db.FollowTopics.Where(a => a.FollowingTID == TID).Where(b => b.FTUserID == TUID);
                if (IsFocus.Count() == 0)
                {
                    topics.focus.Add(false);
                }
                else
                {
                    topics.focus.Add(true);
                }
            }
            return View(topics);
        }

        //话题下的所有问题，动态，热门排序
        public ActionResult questions(int id)//topic id
        {
            TopicModel tm = new TopicModel();
            tm.myUser = db.Users.Find(getCookie("id"));
            tm.topic = new TopicPreNext();
            tm.topic.topic = db.Topics.Find(id);
            tm.topic.fatherTopic = db.Topics.Find(tm.topic.topic.TFatherID);
            tm.topic.childTopic = db.Topics.Where(t => t.TFatherID == id).ToList();
            tm.question = model.getBestAnswerByTopic(tm.topic.topic);
            tm.childQuestion = new List<TopicQuestion>();
            for (int i = 0; i < tm.topic.childTopic.Count(); i++)
            {
                tm.childQuestion.Add(model.getBestAnswerByTopic(tm.topic.childTopic[i]));
            }
            IEnumerable<FollowTopic> IsFocus = db.FollowTopics.Where(a => a.FollowingTID == tm.topic.topic.TID).Where(b => b.FTUserID == tm.myUser.UID);
            if (IsFocus.Count() != 0)
            {
                ViewBag.flag = "focus";
            }
            else
            {
                ViewBag.flag = "nofocus";
            }
            return View(tm);
        }

        //话题下的所有问题，动态，时间排序
        public ActionResult newest(int id)//topic id
        {
            TopicNewestModel tm = new TopicNewestModel();
            tm.myUser = db.Users.Find(getCookie("id"));
            tm.topic = new TopicPreNext();
            tm.topic.topic = db.Topics.Find(id);
            tm.topic.fatherTopic = db.Topics.Find(tm.topic.topic.TFatherID);
            tm.topic.childTopic = db.Topics.Where(t => t.TFatherID == id).ToList();

            tm.question = new List<TopicInfo>();
            TopicQuestion temp = model.getBestAnswerByTopic(tm.topic.topic);

            for (int i = 0; i < tm.topic.topic.QuestionNum; i++)
            {
                TopicInfo questionInfo = new TopicInfo();
                questionInfo.topic = temp.topic;
                questionInfo.question = temp.question[i];
                questionInfo.hotAnswer = temp.HotAnswer[i];
                questionInfo.hotUser = temp.HotUser[i];
                tm.question.Add(questionInfo);
            }
            List<TopicQuestion> childQuestion = new List<TopicQuestion>();
            for (int i = 0; i < tm.topic.childTopic.Count(); i++)
            {
                temp = model.getBestAnswerByTopic(tm.topic.childTopic[i]);
                for (int j = 0; j < tm.topic.childTopic[i].QuestionNum; j++)
                {
                    TopicInfo questionInfo = new TopicInfo();
                    questionInfo.topic = tm.topic.childTopic[i];
                    questionInfo.question = temp.question[j];
                    questionInfo.hotUser = temp.HotUser[j];
                    questionInfo.hotAnswer = temp.HotAnswer[j];
                    tm.question.Add(questionInfo);
                }
            }
            tm.question = model.orderByQTime(tm.question);

            for (int i = 0; i < tm.question.Count(); i++)
            {
                tm.question[i].timeSpan = model.getTimeSpan(tm.question[i].question.QTime);
            }

            IEnumerable<FollowTopic> IsFocus = db.FollowTopics.Where(a => a.FollowingTID == tm.topic.topic.TID).Where(b => b.FTUserID == tm.myUser.UID);
            if (IsFocus.Count() != 0)
            {
                ViewBag.flag = "focus";
            }
            else
            {
                ViewBag.flag = "nofocus";
            }
            return View(tm);
        }

        //话题下的精品回答
        public ActionResult StarQuestion(int id)//topic id
        {
            TopicStarModel tm = new TopicStarModel();
            tm.myUser = db.Users.Find(getCookie("id"));
            tm.topic = new TopicPreNext();
            tm.topic.topic = db.Topics.Find(id);
            tm.topic.fatherTopic = db.Topics.Find(tm.topic.topic.TFatherID);
            tm.topic.childTopic = db.Topics.Where(t => t.TFatherID == id).ToList();

            List<TopicQuestion> info = new List<TopicQuestion>();
            info.Add(model.getBestAnswerByTopic(tm.topic.topic));
            for (int i = 0; i < tm.topic.childTopic.Count(); i++)
            {
                info.Add(model.getBestAnswerByTopic(tm.topic.childTopic[i]));
            }

            tm.question = new List<TopicInfo>();
            for (int i = 0; i < info.Count(); i++)
            {
                for (var j = 0; j < info[i].question.Count(); j++)
                {
                    if (info[i].HotAnswer[j].AUpvoteNum > 0)
                    {
                        TopicInfo tq = new TopicInfo();
                        tq.topic = info[i].topic;
                        tq.question = info[i].question[j];
                        tq.hotUser = info[i].HotUser[j];
                        tq.hotAnswer = info[i].HotAnswer[j];
                        tq.timeSpan = model.getTimeSpan(info[i].question[j].QTime);
                        tm.question.Add(tq);
                    }
                }
            }
            tm.question = model.orderByAUpvoteNum(tm.question);

            IEnumerable<FollowTopic> IsFocus = db.FollowTopics.Where(a => a.FollowingTID == tm.topic.topic.TID).Where(b => b.FTUserID == tm.myUser.UID);
            if (IsFocus.Count() != 0)
            {
                ViewBag.flag = "focus";
            }
            else
            {
                ViewBag.flag = "nofocus";
            }
            return View(tm);
        }

        //话题下的全部问题，时间排序
        public ActionResult all(int id)//topic id
        {
            TopicAllModel tm = new TopicAllModel();
            tm.myUser = db.Users.Find(getCookie("id"));
            tm.topic = new TopicPreNext();
            tm.topic.topic = db.Topics.Find(id);
            tm.topic.fatherTopic = db.Topics.Find(tm.topic.topic.TFatherID);
            tm.topic.childTopic = db.Topics.Where(t => t.TFatherID == id).ToList();

            List<TopicQuestion> info = new List<TopicQuestion>();
            info.Add(model.getBestAnswerByTopic(tm.topic.topic));
            for (int i = 0; i < tm.topic.childTopic.Count(); i++)
            {
                info.Add(model.getBestAnswerByTopic(tm.topic.childTopic[i]));
            }

            tm.question = new List<TopicAllQuestion>();
            for (int i = 0; i < info.Count(); i++)
            {
                for (var j = 0; j < info[i].question.Count(); j++)
                {
                    TopicAllQuestion taq = new TopicAllQuestion();
                    taq.topic = info[i].topic;
                    taq.question = info[i].question[j];
                    taq.timespan = model.getTimeSpan(taq.question.QTime);
                    tm.question.Add(taq);
                }
            }
            tm.question = model.orderByQTime(tm.question);

            IEnumerable<FollowTopic> IsFocus = db.FollowTopics.Where(a => a.FollowingTID == tm.topic.topic.TID).Where(b => b.FTUserID == tm.myUser.UID);
            if (IsFocus.Count() != 0)
            {
                ViewBag.flag = "focus";
            }
            else
            {
                ViewBag.flag = "nofocus";
            }
            return View(tm);
        }

        //获得cookie
        public int getCookie(string cookieName)
        {
            if (Request.Cookies[cookieName] != null)
            {
                string temp = Request.Cookies[cookieName].Value;
                if (temp != null) return Int32.Parse(temp);
            }
            return -1;
        }


    }
}
