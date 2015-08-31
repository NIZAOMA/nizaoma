using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;
using NOTKNOW.Controllers;

namespace NOTKNOW.Controllers
{
    public class ExploreController : Controller
    {
        //
        // GET: /Explore/
        private Model model = new Model();
        private WebDbContext db = new WebDbContext();

        public ActionResult Index()
        {
            ExploreModel em = new ExploreModel();
            em.recommendation = new QAModel();
            em.monthlyHot = new QAModel();
            em.dailyHot = new QAModel();

            List<Question> q = db.Questions.ToList();
            em.monthlyHot.question = new List<Question>();
            em.dailyHot.question = new List<Question>();
            DateTime present = DateTime.Now;
            DateTime preMonth = DateTime.Now.AddDays(-30);
            for (int i = q.Count()-1; i > 0; i--)
            {
                if (q[i].QTime.ToOADate() > preMonth.ToOADate())
                {
                    em.monthlyHot.question.Add(q[i]);
                    if (q[i].QTime.ToOADate() > present.Date.ToOADate())
                    {
                        em.dailyHot.question.Add(q[i]);
                    }
                }
                else
                {
                    break;
                }
            }
            em.monthlyHot.question = em.monthlyHot.question.OrderByDescending(a => a.QAnswerNum).ToList();
            em.dailyHot.question = em.dailyHot.question.OrderByDescending(a => a.QAnswerNum).ToList();

            em.monthlyHot.answer = new List<Answer>();
            em.monthlyHot.user = new List<User>();
            for (int i = 0; i < em.monthlyHot.question.Count() && i < 20; i++)
            {
                em.monthlyHot.answer.Add(model.getHotAnswerByQuestionID(em.monthlyHot.question[i].QID));
                em.monthlyHot.user.Add(db.Users.Find(em.monthlyHot.answer[i].AUserID));
            }

            em.dailyHot.answer = new List<Answer>();
            em.dailyHot.user = new List<User>();
            for (int i = 0; i < em.dailyHot.question.Count() && i < 20; i++)
            {
                em.dailyHot.answer.Add(model.getHotAnswerByQuestionID(em.dailyHot.question[i].QID));
                em.dailyHot.user.Add(db.Users.Find(em.dailyHot.answer[i].AUserID));
            }

            em.recommendation.question = new List<Question>();
            em.recommendation.answer = new List<Answer>();
            em.recommendation.user = new List<User>();

            em.recommendation.question = db.Questions.Where(a => a.QAnswerNum > 0).OrderByDescending(a => a.QAnswerNum).ToList();
            for (int i = 0; i < em.recommendation.question.Count() && i < 1; i++)
            {
                em.recommendation.answer.Add(model.getHotAnswerByQuestionID(em.recommendation.question[i].QID));
                em.recommendation.user.Add(db.Users.Find(em.recommendation.answer[i].AUserID));
            }

            return View(em);
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
