using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{

    public class FollowController : Controller
    {
        //
        // GET: /Follow/
        private Model model = new Model();
        private WebDbContext db = new WebDbContext();
        public ActionResult Index()
        {
            return View();
        }

        //add upvote
        public ActionResult addUpvote(int id)
        {
            Answer a = db.Answers.Find(id);
            User u = db.Users.Find(a.AUserID);
            a.AUpvoteNum++;
            u.UUpvoteNum++;
            string h = "$('." + a.AID + "')[1].innerText=" + a.AUpvoteNum + ";" + "$('." + a.AID + "')[1].innerText=" + a.AUpvoteNum + ";";
            string j = "$('." + a.AID + ".up2').css('display','block');$('." + a.AID + ".up1').css('display','none');";
            string k = "$('." + a.AID + ".down1').css('display','block');$('." + a.AID + ".down2').css('display','none');";
            db.SaveChanges();
            return JavaScript(h + j + k);
        }

        public ActionResult _addUpvote(int id)
        {
            Answer a = db.Answers.Find(id);
            User u = db.Users.Find(a.AUserID);
            a.AUpvoteNum--;
            u.UUpvoteNum--;
            string h = "$('." + a.AID + "')[0].innerText=" + a.AUpvoteNum + ";" + "$('." + a.AID + "')[1].innerText=" + a.AUpvoteNum + ";";
            string j = "$('." + a.AID + ".up2').css('display','none');$('." + a.AID + ".up1').css('display','block');";
            string k = "$('." + a.AID + ".down1').css('display','block');$('." + a.AID + ".down2').css('display','none');";
            db.SaveChanges();
            return JavaScript(h + j + k);
        }
        //delete upvote
        public ActionResult delUpvote(int id)
        {
            Answer a = db.Answers.Find(id);
            User u = db.Users.Find(a.AUserID);
            a.ADownvoteNum++;
            string h = "$('." + a.AID + "')[0].innerText=" + a.AUpvoteNum + ";" + "$('." + a.AID + "')[1].innerText=" + a.AUpvoteNum + ";";
            string k = "$('." + a.AID + ".down1').css('display','none');$('." + a.AID + ".down2').css('display','block');";
            db.SaveChanges();
            return JavaScript(h + k);
        }

        public ActionResult _delUpvote(int id)
        {
            Answer a = db.Answers.Find(id);
            User u = db.Users.Find(a.AUserID);
            a.ADownvoteNum--;
            string h = "$('." + a.AID + "')[0].innerText=" + a.AUpvoteNum + ";" + "$('." + a.AID + "')[1].innerText=" + a.AUpvoteNum + ";";
            string k = "$('." + a.AID + ".down1').css('display','block');$('." + a.AID + ".down2').css('display','none');";
            db.SaveChanges();
            return JavaScript(h + k);
        }

        //关注问题
        public ActionResult followQuestion(int id)
        {
            //在focusQuestion数据库表增加一条关注
            FollowQuestion fq = new FollowQuestion();
            fq.FollowingQID = id;
            if (getCookie("id") == -1)
                return RedirectToAction("index", "index");
            fq.FQUserID = getCookie("id");
            db.FollowQuestions.Add(fq);
            Question q = db.Questions.Find(id);//修改问题关注数量
            q.QFollowNum++;
            User u = db.Users.Find(fq.FQUserID);
            u.UFQuestionNum++;
            db.SaveChanges();
            return JavaScript("$('.unfollow-button').css('display','block');$('.follow-button').css('display','none');");
        }

        //取消问题关注
        public ActionResult _followQuestion(int id)
        {
            FollowQuestion fq = db.FollowQuestions.First(d => d.FollowingQID == id);
            Question q = db.Questions.Find(id); //修改问题关注数量
            q.QFollowNum--;
            User u = db.Users.Find(fq.FQUserID);
            u.UFQuestionNum++;
            db.FollowQuestions.Remove(fq); //删除一条关注  
            db.SaveChanges();
            return JavaScript("$('.unfollow-button').css('display','none');$('.follow-button').css('display','block');");
        }
        //关注话题
        public ActionResult followTopic(int id)
        {
            FollowTopic fq = new FollowTopic();
            fq.FollowingTID = id;
            if (getCookie("id") == -1)
                return RedirectToAction("index", "index");
            fq.FTUserID = getCookie("id");
            db.FollowTopics.Add(fq);
            db.SaveChanges();
            Topic q = db.Topics.Find(id);
            q.TFollowerNum++;
            User u = db.Users.Find(fq.FTUserID);
            u.UFTopicNum++;
            db.SaveChanges();
            return JavaScript("$('.unfollow-button').css('display','block');$('.follow-button').css('display','none');");
        }

        //取消话题关注
        public ActionResult _followTopic(int id)
        {
            if (getCookie("id") == -1)
                return RedirectToAction("index", "index");
            int uid = getCookie("id");
            FollowTopic fq = db.FollowTopics.Where(d => d.FollowingTID == id)
                .Where(d => d.FTUserID == uid).First();
            Topic q = db.Topics.Find(id);//话题被关注数量-
            q.TFollowerNum--;
            User u = db.Users.Find(fq.FTUserID);//用户关注话题数目--
            u.UFTopicNum--;
            db.FollowTopics.Remove(fq);//删除关注话题
            db.SaveChanges();
            return JavaScript("$('.unfollow-button').css('display','none');$('.follow-button').css('display','block');");
        }


        //关注人
        public ActionResult followUser(int id)
        {
            FollowUser fu = new FollowUser();

            if (getCookie("id") == -1) return RedirectToAction("index", "index");
            fu.FUUserID = getCookie("id");//当前登录用户
            fu.FollowingUID = id;//界面所显示的用户
            db.FollowUsers.Add(fu);
            User u = db.Users.Find(fu.FUUserID);
            u.UFollowingNum++;
            User a = db.Users.Find(fu.FollowingUID);
            a.UFollowerNum++;
            db.SaveChanges();
            return JavaScript("$('.unfollow-button').css('display','block');$('.follow-button').css('display','none');");

        }

        //取消对人的关注
        public ActionResult _followUser(int id)
        {
            if (getCookie("id") == -1) return RedirectToAction("index", "index");
            User u = db.Users.Find(getCookie("id"));
            u.UFollowingNum--;
            User a = db.Users.Find(id);
            a.UFollowerNum--;
            FollowUser fu = db.FollowUsers.First(d => d.FollowingUID == id);
            db.FollowUsers.Remove(fu);
            db.SaveChanges();
            return JavaScript("$('.unfollow-button').css('display','none');$('.follow-button').css('display','block');");
        }

        //获得cookie
        public int getCookie(string cookieName)
        {
            if (Request.Cookies[cookieName] != null)
            {
                string temp = Request.Cookies[cookieName].Value;
                return Int32.Parse(temp);
            }
            else return -1;

        }
    }
}
