using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.Entity;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    public class PeopleController : Controller
    {
        private Model model = new Model();
        private WebDbContext db = new WebDbContext();
        //
        // GET: /People/

        //首页 显示出用户所有的信息
        public ActionResult Index()
        {
            int id = getCookie("id");
            if (id == -1) return RedirectToAction("index", "index");
            UserModel thisUser = model.getAllUserInfo(id);
            isFocus(id);
            return View(thisUser);
        }

        public ActionResult _Index(string email)
        {
            User user = db.Users.FirstOrDefault(d => d.UEmail == email);
            if (user != null)
            {
                UserModel thisUser = model.getAllUserInfo(user.UID);
                isFocus(user.UID);
                return View("index", thisUser);
            }
            else return new EmptyResult();
        }


        //修改用户信息
        [HttpGet]
        public ActionResult Edit()
        {
            int id = getCookie("id");
            if (id == -1) return RedirectToAction("index", "index");
            User user = model.findUserByID(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        [HttpPost]
        public ActionResult Edit(User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", "people");
            }
            return View(user);
        }

        //修改密码
        [HttpGet]
        public ActionResult Password()
        {
            int id = getCookie("id");
            User user = model.findUserByID(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        public ActionResult PersonalPage()
        {
            int id = getCookie("id");
            if (id == -1) return RedirectToAction("index", "index");

            User model = db.Users.First(c => c.UID == id);

            HttpPostedFileBase file = Request.Files["fileToUpload"];

            string path2 = file.FileName;
            if (path2 != "")
            {
                string path = "D:/NOTKNOW_final/NOTKNOW/Content/res/" + path2;
                file.SaveAs(path);
                model.UPhoto = "/content/res/" + path2;
            }
            if (Request.Form["fileToUpload"] != "")


                if (Request.Form["UIntroduction"] != "")
                    model.UIntroduction = Request.Form["UIntroduction"];
                else
                    model.UIntroduction = null;
            if (Request.Form["UCareer"] != "")
                model.UCareer = Request.Form["UCareer"];
            else
                model.UCareer = null;
            if (Request.Form["UName"] != "")
                model.UName = Request.Form["UName"];
            // if (Request.Form["UPhoto"] != "")
            //    model.UName = Request.Form["UPhoto"];
            string oldpas = Request.Form["oldPassword"];
            string newpas = Request.Form["newPassword"];
            string conpas = Request.Form["confirmPassword"];
            if (Request.Form["oldPassword"] != "")
            {
                if (Request.Form["newPassword"] == "")
                {
                    TempData["info"] = "请输入新密码";
                    return RedirectToAction("edit", "people");
                }
                else if (Request.Form["confirmPassword"] == "")
                {
                    TempData["info"] = "请输入确认密码";
                    return RedirectToAction("edit", "people");
                }
                else if (oldpas != model.UPassword)
                {
                    TempData["info"] = "密码不正确，不能修改";
                    return RedirectToAction("edit", "people");
                }
                else if (newpas != conpas)
                {
                    TempData["info"] = "确认密码不正确";
                    return RedirectToAction("edit", "people");
                }
                else
                {
                    if (newpas.Contains(" "))
                    {
                        TempData["info"] = "密码不能含有空格，请重新输入";
                        return RedirectToAction("edit", "people");
                    }
                    else
                        model.UPassword = newpas;
                }
            }
            db.SaveChanges();
            return RedirectToAction("edit", "people");
            //return RedirectToRoute("/people/edit/"+id);
            //return RedirectToAction("index", "people", new { id = id });

        }

        //修改密码
        [HttpPost]
        public ActionResult Password(int id)
        {
            id = getCookie("id");
            User user = db.Users.First(d => d.UID == id);
            string oldpas = Request.Form["oldPassword"];
            string newpas = Request.Form["newPassword"];
            string conpas = Request.Form["confirmPassword"];
            if (oldpas != user.UPassword)
            {
                ViewBag.info = "密码不正确";
            }
            else if (newpas != conpas)
            {
                ViewBag.info = "确认密码不正确";
            }
            else if (newpas != "" && conpas != "")
            {
                user.UPassword = newpas;
                db.SaveChanges();
                return RedirectToAction("index");
            }
            return View(user);
        }

        public ActionResult ask()
        {
            int id = getCookie("id");
            if (id == -1) return RedirectToAction("index", "index");
            UserModel thisUser = model.getAllUserInfo(id);
            isFocus(thisUser.myUser.UID);
            return View(thisUser);
        }

        public ActionResult _ask(string email)
        {
            User user = db.Users.FirstOrDefault(d => d.UEmail == email);
            isFocus(user.UID);
            UserModel thisUser = model.getAllUserInfo(user.UID);
            return View("ask", thisUser);
        }

        public ActionResult answer()
        {
            int id = getCookie("id");
            if (id == -1) return RedirectToAction("index", "index");
            UserModel thisUser = model.getAllUserInfo(id);
            isFocus(thisUser.myUser.UID);
            List<Answer> a = thisUser.answers.ToList();
            List<Question> q = new List<Question>();
            for (int i = 0; i < a.Count(); i++)
            {
                Question temp = new Question();
                temp = db.Questions.Find(a[i].AQuestionID);
                q.Add(temp);
            }
            thisUser.questions = q.AsEnumerable();
            //显示people文件夹下的index页面
            return View(thisUser);
        }

        public ActionResult _answer(string email)
        {
            User user = db.Users.FirstOrDefault(d => d.UEmail == email);
            isFocus(user.UID);
            UserModel thisUser = model.getAllUserInfo(user.UID);
            List<Answer> a = thisUser.answers.ToList();
            List<Question> q = new List<Question>();
            for (int i = 0; i < a.Count(); i++)
            {
                Question temp = new Question();
                temp = db.Questions.Find(a[i].AQuestionID);
                q.Add(temp);
            }
            thisUser.questions = q.AsEnumerable();

            //显示people文件夹下的index页面
            return View("answer", thisUser);
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

        public void isFocus(int fu)
        {
            int id = getCookie("id");
            if (fu != id)
                ViewBag.user = "notme";
            else ViewBag.user = "me";
            var u = from c in db.FollowUsers where (c.FollowingUID == fu && c.FUUserID == id) select c;
            IEnumerable<FollowUser> uu = u.AsEnumerable();
            if (uu.Count() == 0)
            {
                ViewBag.focus = "nofocus";
            }
            else
                ViewBag.focus = "focus";
        }

        public ActionResult focusTopic(string email)
        {
            User user = db.Users.FirstOrDefault(d => d.UEmail == email);
            isFocus(user.UID);
            UserModel thisUser = model.getAllUserInfo(user.UID);
            return View(thisUser);
        }

    }
}
