using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    public class QuestionController : Controller
    {
        //
        // GET: /Question/
        private Model model = new Model();
        private WebDbContext db = new WebDbContext();
        public ActionResult Index()
        {
            IEnumerable<Question> question =  model.getAllQuestions();
            return View(question);
        }

        [HttpPost]
        public ActionResult putup()
        {
            int uID = getCookie("id");
            if (uID == -1) return RedirectToAction("index", "index");
            string c = Request.Form["QContent"];
            string d = Request.Form["QDescription"];
            if(c != "" && d != "")
                model.addQuestion(c, d, uID);
            return RedirectToAction("index");           
        }

        //根据问题id调出问题的内容和所有的回答
        public ActionResult show(int id)
        {
            //返回问题，提问的人和该问题的所有答案及回答问题的人的信息
            int uid = getCookie("id");
            QuestionModel qm = model.findQuestionInfoByQID(id);
            qm.myUser = db.Users.Find(uid);
            qm.topic = db.Topics.Find(qm.question.QTopicType1);
            qm.topics = db.Topics.ToList();
            for (var i = 0; i < qm .CA.Count(); i++)
            {
                qm.CA[i].uID = qm.myUser.UID;
            }

            IEnumerable<FollowQuestion> fq = db.FollowQuestions.Where(d => d.FQUserID == uid);
            if (fq != null)
            {
                if (fq.FirstOrDefault(d => d.FQID == id) != null)
                {
                    ViewBag.flag = "focus";
                }
                else ViewBag.flag = "nofocus";
            }
            else ViewBag.flag = "nofocus";
            return View(qm);
        }


        //删除cookie
        public void deleteCookie(string cookieName)
        {
            HttpCookie cookie = new HttpCookie(cookieName);
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddDays(-30);
                Response.Cookies.Add(cookie);
            }
        }

        //添加cookie
        public void addCookie(string cookieName, string value)
        {
            HttpCookie _cookie = new HttpCookie(cookieName);
            _cookie.Value = value;
            _cookie.Expires = DateTime.MaxValue;
            _cookie.Path = "/";
            Response.Cookies.Add(_cookie);
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

        //给问题增加回答
        [ValidateInput(false)]
        public ActionResult answer(int id,Answer A)
        {
            int Uid = -1;
            if (Request.Cookies["id"] != null)
            {
                var cookies = Request.Cookies["id"].Value;
                if (cookies != null) Uid = Int32.Parse(cookies);
            }
            else return RedirectToAction("index", "index");

            int QID = id;
            List<Answer> test = db.Answers.Where(a => a.AUserID == Uid).Where(a => a.AQuestionID == QID).ToList();

            if (test.Count() == 0)
            {
                model.addAnswerToQuestion(Uid, id, A);
                return RedirectToAction("show", new { id = id });
            }
            else
            {
                ViewBag.info = "您已经回答过该问题，不能再回答";
                return RedirectToAction("show", new { id = id });
            }
           

        }

        //修改问题
        [HttpPost]
        public ActionResult edit(int id)
        {
            int uID = -1;
            if (Request.Cookies["id"] != null)
            {
                var cookies = Request.Cookies["id"].Value;
                if (cookies != null) uID = Int32.Parse(cookies);
            }
            else return RedirectToAction("index", "index");
            model.editQuestionByID(id, Request.Form["QContent"], Request.Form["QDescription"]);

            return RedirectToAction("show", new { id = id});
        }

       // 修改话题
        [HttpPost]
        public ActionResult editTopic(int id)
        {
            int uID = -1;
            if (Request.Cookies["id"] != null)
            {
                var cookies = Request.Cookies["id"].Value;
                if (cookies != null) uID = Int32.Parse(cookies);
            }
            else return RedirectToAction("index", "index");
            QuestionModel q = model.findQuestionInfoByQID(id);
            Question Q1 = db.Questions.Find(id);
            string s = Request.Form["QTopic"];
            List<Topic> top = db.Topics.ToList();
            top[Q1.QTopicType1 - 1].QuestionNum--;
            int i;
            for (i = 0; i < top.Count(); i++)
            {
                if (s == top[i].TContent)
                {
                    q.question.QTopicType1 = i+1;
                    Q1.QTopicType1 = i + 1;
                    top[i].QuestionNum++;
                    break;
                }
            }
            db.SaveChanges();
            return RedirectToAction("show", new { id = id });
        }

        //修改问题内容
        [HttpPost]
        public ActionResult editQContent(int id)
        {
           
            string s=Request.Form["editQContent"];
            string reason = Request.Form["editQContentReason"];
            if (reason == "other")
            {
                string reason2 = Request.Form["ownQContentReason"];
                if (reason2 == "")
                    reason2 = null;
                reason = reason2;
            }
            Question question = db.Questions.Find(id);
            Edit ed = new Edit();
            ed.EContent = question.QContent;
            ed.EQID = id;
            ed.EReason = reason;
            ed.EUID = id;
            ed.ETime = DateTime.Now;
            db.Edits.Add(ed);

            if (s!= "")
            {
                question.QContent = s;
                db.SaveChanges();
            }
            

            return RedirectToAction("show", new { id = id });
        }


        //修改问题描述
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult editQDescription(int id)
        {
            
            string s = Request.Form["editQDescription"];
            Question question = db.Questions.Find(id);
            if (s == "")
                s = null;

                question.QDescription = s;
                db.SaveChanges();

            return RedirectToAction("show", new { id = id });
        }

        //修改回答
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult editAnswer(int id)
        {
            string s = Request.Form["editAnswer"];
            Answer a = db.Answers.Find(id);
            if(s!="")
            a.AContent = s;
            db.SaveChanges();

            return RedirectToAction("show", new { id = a.AQuestionID});
        }

        //删除回答
        
        public ActionResult cancelAnswer(int id)
        {

            int QID = db.Answers.Find(id).AQuestionID;
            Question q = model.deleteAnswerByID(id);

            db.SaveChanges();

            return RedirectToAction("show", new { id = QID });
        }

        [ValidateInput(false)]
        public ActionResult question()
        {
            int uID = getCookie("id");
            if (uID == -1) return RedirectToAction("index", "index");
            Question q = new Question();
            string c = Request.Form["QContent"];
            string d = Request.Form["QDescription"];
            string e = Request.Form["topicSelect"];
            List<Topic> topic = db.Topics.ToList();
            if (c != "")
            {
                int i;
                for (i = 0; i < topic.Count(); i++)
                {
                    if (e == topic[i].TContent)
                    {
                        q.QTopicType1 = i + 1;
                        topic[i].QuestionNum++;
                        break;
                    }
                }
                if (i >= topic.Count())
                    q.QTopicType1 = 5;
                if (model.searchWord(c))
                {
                    q.QState = "reject";
                    q.QContent = c;
                    if (d == "")
                        q.QDescription = null;
                    else
                        q.QDescription = d;
                    q.QUserID = uID;
                    //db.Questions.Add(q);
                    //db.SaveChanges();
                    model.sendMessage(uID, 1, "你的提问含有敏感词，拒绝发布", 3);
                    return RedirectToAction("inbox", "message", new { id = 1 });
                }
                else
                {

                    q.QUserID = uID;
                    q.QContent = c;
                    q.QDescription = d;
                    q.QState = "unknown";
                    db.Questions.Add(q);
                    User u = db.Users.Find(uID);
                    u.UQuestionNum++;
                    db.SaveChanges();
                    return RedirectToAction("show", new { id = q.QID });
                }
            }
            else 
                return RedirectToAction("index", "index");
           
        }


        //修改回答
        [HttpPost]
        public ActionResult answer_edit(int id)
        {   
            Answer answer = model.editAnswerByID(id, Request.Form["AContent_edit"]);
            return RedirectToAction("show", new { id = answer.AQuestionID});
        }
        //删除回答
        public ActionResult answer_delete(int id)
        {
            Question question = model.deleteAnswerByID(id);
            return RedirectToAction("show", new {id = question.QID});
        }

        //TODO:这些好像可以去掉了。。。
        /*
        //给答案增加点赞
        public void answer_pro(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.AUpvoteNum++;
            db.SaveChanges();
            return;
        }
        //给答案减少赞
        public void answer_pro_(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.AUpvoteNum--;
            db.SaveChanges();
            return;
        }
        //给答案增加反对
        public void answer_con(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.ADownvoteNum++;
            db.SaveChanges();
            return;
        }
        //给答案减少反对
        public void answer_con_(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.ADownvoteNum--;
            db.SaveChanges();
            return;
        }
        //给答案增加没有帮助
        public void answer_useless(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.AUselessNum++;
            db.SaveChanges();
            return;       
        }
        //给答案减少没有帮助
        public void answer_useless_(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.AUselessNum++;
            db.SaveChanges();
            return;
        }
        */
    }
}
