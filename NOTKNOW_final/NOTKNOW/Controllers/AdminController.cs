using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    public class AdminController : Controller
    {
        Model model = new Model();
        WebDbContext db = new WebDbContext();
        //
        // GET: /Admin/

        public ActionResult Index()
        {
            AdminWordModel word = new AdminWordModel();
            word.word = db.Words.ToList();
            return View(word);
        }

        //查看所有未审批的问题
        public ActionResult questions()
        {
            AdminQuestionModel aqm = new AdminQuestionModel();
            aqm.question = db.Questions.Where(a => a.QState == "unknown").ToList();
            aqm.user = new List<User>();
            for (int i = 0; i < aqm.question.Count(); i++)
            {
                aqm.user.Add(db.Users.Find(aqm.question[i].QUserID));
            }
            return View(aqm);
        }

        //查看所有未审批的答案
        public ActionResult answers()
        {
            AdminAnswerModel aam = new AdminAnswerModel();
            aam.answer = db.Answers.Where(a => a.AStatus == "unknown").ToList();
            aam.user = new List<User>();
            aam.question = new List<Question>();
            for (int i = 0; i < aam.answer.Count(); i++)
            {
                aam.user.Add(db.Users.Find(aam.answer[i].AUserID));
                aam.question.Add(db.Questions.Find(aam.answer[i].AQuestionID));
            }
            return View(aam);
        }

        //修改回答状态为reject
        public ActionResult rejectAnswer(int id)
        {
            Answer q = db.Answers.Find(id);
            q.AStatus = "reject";
            db.Answers.Remove(q);
            db.Users.Find(q.AUserID).UAnswerNum--;
            db.Questions.Find(q.AQuestionID).QAnswerNum--;
            List<Comment> c = db.Comments.Where(a => a.CAnswerID == id).ToList();
            for (int i = 0; i < c.Count(); i++)
            {
                db.Comments.Remove(c[i]);
            }
            db.SaveChanges();
            String s = "$('#answer-" + q.AID + "').css('display', 'none');";
            return JavaScript(s);
        }

        //修改回答状态为pass
        public ActionResult passAnswer(int id)
        {
            Answer q = db.Answers.Find(id);
            q.AStatus = "pass";
            db.SaveChanges();
            String s = "$('#answer-" + q.AID + "').css('display', 'none');";
            return JavaScript(s);
        }

        //修改问题状态为reject
        public ActionResult rejectQuestion(int id)
        {
            Question q = db.Questions.Find(id);
            q.QState = "reject";
            db.Questions.Remove(q);
            db.Users.Find(q.QUserID).UQuestionNum--;
            db.Topics.Find(q.QTopicType1).QuestionNum--;
            List<Answer> a = db.Answers.Where(b => b.AQuestionID == id).ToList();
            for (int i = 0; i < a.Count(); i++)
            {
                db.Users.Find(a[i].AUserID).UAnswerNum--;
                db.Answers.Remove(a[i]);
            }
            db.SaveChanges();
            String s = "$('#question-" + q.QID + "').css('display', 'none');";
            return JavaScript(s);
        }

        //修改问题状态为pass
        public ActionResult passQuestion(int id)
        {
            Question q = db.Questions.Find(id);
            q.QState = "pass";
            db.SaveChanges();
            String s = "$('#question-" + q.QID + "').css('display', 'none');";
            return JavaScript(s);
        }

        [HttpPost]
        public ActionResult insertWord()
        {
            String add = Request.Form["insertWord"];
            model.addWord(add);
            return RedirectToAction("Index");
        }
    }
}
