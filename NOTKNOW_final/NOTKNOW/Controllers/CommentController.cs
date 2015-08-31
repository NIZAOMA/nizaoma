using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;
namespace NOTKNOW.Controllers
{
    public class CommentController : Controller
    {
        //
        // GET: /Comment/
        private Model model = new Model();
        private WebDbContext db = new WebDbContext();

/*        public string Index(string id)
        {
            int uId = Int32.Parse(id);
            User u = db.Users.First(d => d.UID == uId);
            return u.UName;
        }*/
        public ActionResult Index()
        {

            if (Request.IsAjaxRequest())
            {//如果该请求是Ajax请求  
                var a = Request.Form["test"];
                var testObj = new List<string>() { "eee", "fff", "ddd", "ggg" };
                testObj.Add(a);
                //ViewData["list"] = testObj;
                return PartialView("commment", testObj);
            }
            else
            {
                ViewBag.Message = "Welcome to ASP.NET MVC!";
                var testObj = new List<string>() { "aaa", "bbbb", "ccc" };
                ViewData["list"] = testObj;
            }

            return View();
        }

        //删除comment
        //参数：commentID       
        public ActionResult delete(int id)
        {
            Comment c = db.Comments.First(d => d.CID == id);
            int aid = c.CAnswerID;
            Answer a = db.Answers.First(d => d.AID == aid);
            if(a.ACommentNum != 0)
                a.ACommentNum--;
            db.Comments.Remove(c);
            db.SaveChanges();
            string h = "$('.zm-item-comment."+id+"').css('display','none')";
            return JavaScript(h);
            
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
        [HttpPost]
        public ActionResult update(int id)
        {
            
            if (Request.IsAjaxRequest())
            {
                var c = 0;
                lock (typeof(Environment))
                {
                    if (c != 1)
                    {
                        string content = Request.Form["comment"];
                        addComment(content, id);
                        c = 1;
                    }
                    //int qid = db.Answers.FirstOrDefault(d => d.AID == id).AQuestionID;
                    var CA = new CtoA();
                    CA.comments = db.Comments.Where(d => d.CAnswerID == id);
                    CA.users = new List<User>();
                    CA.uID = getCookie("id");
                    for (var i = 0; i < CA.comments.Count(); i++)
                    {
                        CA.aID = CA.comments.ToList()[i].CAnswerID;
                        var temp = new User();
                        int uId = CA.comments.ToList()[i].CUserID;
                        temp = db.Users.First(d => d.UID == uId);
                        CA.users.Add(temp);
                    }
                    return PartialView("comment", CA);
                }             
                
            }
            else return new EmptyResult();
        }

        protected void addComment(string content, int aID)
        {
            lock (typeof(Environment))
            {
                Comment c = new Comment();
                c.CUserID = getCookie("id");
                c.CContent = content;
                c.CAnswerID = aID;
                if (c.CContent != "")
                {
                    db.Comments.Add(c);
                    Answer a = db.Answers.First(d => d.AID == aID);
                    a.ACommentNum++;
                    db.SaveChanges();
                }
            }
        }
    }
}
