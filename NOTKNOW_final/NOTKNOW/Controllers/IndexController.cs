using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    public class IndexController : Controller
    {
        private Model model = new Model();
        //
        // GET: /Index/
        private WebDbContext db = new WebDbContext();

        public ActionResult Index()
        {
            //如果用户已经注册 直接跳转到首页
            if (getCookie("id") != -1)
            {
                int id = getCookie("id");
                IndexModel m = model.loadIndex(id);
                return View("newIndex", m);
            }
            else
            {
                indexModel index = new indexModel();
                index.topics = db.Topics.ToList();
                index.question = new List<List<Question>>();
                for (int i = 0; i < index.topics.Count(); i++)
                {
                    List<Question> a = new List<Question>();
                    int tid = index.topics[i].TID;
                    a = db.Questions.Where(d => d.QTopicType1 == tid).ToList();
                    index.question.Add(a);
                }
                return View(index);
            }
        }


        public ActionResult topView()
        {
            int id = getCookie("id");
            UserModel thisUser = model.getAllUserInfo(id);
            thisUser.topics = db.Topics;
            return PartialView(thisUser);
        }

        //注册
        [HttpPost]
        public ActionResult Register()
        {
            string uName = Request.Form["last_name"];
            string uEmail = Request.Form["email"];
            string uPsw = Request.Form["password"];

            var anyUser = model.findUserByEmail(uEmail);
            if (anyUser == null)//不存在重复的邮箱
            {
                if (uPsw.Contains(" "))
                {
                    ViewBag.info = "密码不能包含空格，请重新输入";
                    indexModel index = new indexModel();
                    index.topics = db.Topics.ToList();
                    index.question = new List<List<Question>>();
                    for (int i = 0; i < index.topics.Count(); i++)
                    {
                        List<Question> a = new List<Question>();
                        int tid = index.topics[i].TID;
                        a = db.Questions.Where(d => d.QTopicType1 == tid).ToList();
                        index.question.Add(a);
                    }
                    return View("index", index);
                }
                else
                {
                    User user = model.addUser(uName, uEmail, uPsw);
                    addCookie("id", user.UID.ToString());
                    //登陆成功，进入个人主页界面
                    return RedirectToAction("index", "people");
                }
            }
            else
            {
                ViewBag.info = "该邮箱已经被注册";
                indexModel index = new indexModel();
                index.topics = db.Topics.ToList();
                index.question = new List<List<Question>>();
                for (int i = 0; i < index.topics.Count(); i++)
                {
                    List<Question> a = new List<Question>();
                    int tid = index.topics[i].TID;
                    a = db.Questions.Where(d => d.QTopicType1 == tid).ToList();
                    index.question.Add(a);
                }
                return View("index", index);
            }

        }

        
        //登陆
        [HttpPost]
        public ActionResult Login()
        {
            string uPas = Request.Form["password"];
            string uEmail = Request.Form["email"];
            User loginUser = model.findUserByEmail(uEmail);
            if (loginUser == null)
            {
                ViewBag.info= "用户名错误";
                indexModel index = new indexModel();
                index.topics = db.Topics.ToList();
                index.question = new List<List<Question>>();
                for (int i = 0; i < index.topics.Count(); i++)
                {
                    List<Question> a = new List<Question>();
                    int tid = index.topics[i].TID;
                    a = db.Questions.Where(d => d.QTopicType1 == tid).ToList();
                    index.question.Add(a);
                }
                return View("index", index);
            }
            else
            {
                if (loginUser.UPassword == uPas)//登陆成功进入
                {
                    addCookie("id", loginUser.UID.ToString());
                    return RedirectToAction("index","index");
                }
                else
                {
                    ViewBag.info = "密码错误";
                    indexModel index = new indexModel();
                    index.topics = db.Topics.ToList();
                    index.question = new List<List<Question>>();
                    for (int i = 0; i < index.topics.Count(); i++)
                    {
                        List<Question> a = new List<Question>();
                        int tid = index.topics[i].TID;
                        a = db.Questions.Where(d => d.QTopicType1 == tid).ToList();
                        index.question.Add(a);
                    }
                    return View("index", index);
                }
            }
        }

        public ActionResult Logout()
        {
            deleteCookie("id");
            return RedirectToAction("index");
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
                return Int32.Parse(temp);
            }
            else return -1;

        }
        public ActionResult textEdit()
        {
            return View();
        }

    }
}
