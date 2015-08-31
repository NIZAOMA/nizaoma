using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;
namespace NOTKNOW.Controllers
{
    public class SearchController : Controller
    {
        //
        // GET: /Search/
        private WebDbContext db = new WebDbContext();
        private Model model = new Model();

        public ActionResult questionSearch(string q)
        {
            SearchQuestionModel sqm = new SearchQuestionModel();
            sqm.question = model.selectByKeywords(q);
            sqm.answer = new List<List<Answer>>();
            sqm.user = new List<List<User>>();
            for (int i = 0; i < sqm.question.Count(); i++)
            {
                List<Answer> a= new List<Answer>();
                sqm.answer.Add(a);
                List<User> u = new List<User>();
                sqm.user.Add(u);
               
                for (int j = 0; j < sqm.question[i].Count(); j++)
                {

                    if (model.getHotAnswerByQuestionID(sqm.question[i][j].QID).AID==0)
                    {
                        sqm.answer[i].Add(model.getHotAnswerByQuestionID(sqm.question[i][j].QID));
                        
                        sqm.user[i].Add(new User());
                    }
                    else
                    {
                        sqm.answer[i].Add(model.getHotAnswerByQuestionID(sqm.question[i][j].QID));
                        sqm.user[i].Add(model.getUserByAnswerID(sqm.answer[i][j].AID));
                    }
                }
            }
            ViewBag.searchContent = q;

            return View(sqm);
        }
        public ActionResult userSearch(string q)
        {
            SearchQuestionModel sqm = new SearchQuestionModel();
            sqm.user = model.selectByUName(q);
            ViewBag.searchContent = q;
            return View(sqm);
        }

        public ActionResult topicSearch(string q)
        {
            SearchTopicModel stm = new SearchTopicModel();
            stm.topic = model.selectByTContent(q);
            ViewBag.searchContent = q;
            return View(stm);
        }
    }
}
