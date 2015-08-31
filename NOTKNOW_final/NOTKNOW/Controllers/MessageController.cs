using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    public class MessageController : Controller
    {
        private Model model = new Model();
        private WebDbContext db = new WebDbContext();
        //
        // GET: /Message/
        //显示每个用户私信一条的界面，最新的那个
        public ActionResult Index()
        {
            int id = getCookie("id");
            MessageModel m = model.getAllMessage(id);
            m.toUser = db.Users.ToList();
            return View(m);
        }

     
        //显示和指定用户id所有的私信
        public ActionResult inbox(int id)
        {
            int uid = getCookie("id");
            MessageModel m = model.getAllMessage(uid);
            MessagePack mp = m.packs.FirstOrDefault(d=>d.id == id);
            if(mp != null)  
                return View(mp);
            else 
                return RedirectToAction("index");
        }
        //给指定用户发送Message
        [HttpPost]
        public ActionResult send(int id)
        {
            string MContent = Request.Form["content"];
            if (MContent != "")
            {
                model.sendMessage(id, getCookie("id"), MContent, 3);
                return RedirectToAction("inbox", new { id =id});
            }
            return RedirectToAction("index");
        }

        [HttpPost]
        public ActionResult sendto()
        {
            string toID = Request.Form["people"];
            string  s = "";
            for(int i=0;i<toID.Length;i++)
            {
                if(toID[i]==' ')
                    break;
                else
                    s+=toID[i];
            }
            int id = Int32.Parse(s);
            string MContent = Request.Form["content"];
            if (MContent != "")
                {
                    model.sendMessage(id,getCookie("id"),  MContent, 3);
                    return RedirectToAction("inbox", new { id = id });
                }
                return RedirectToAction("index");
          
        }

        //删除和一个用户的所有通讯信息
        public ActionResult deleteAll(int id)
        {
            int uid = getCookie("id");
            IEnumerable<Message> a = db.Messages.Where(d => d.MFrom == id).Where(d => d.MTo == uid);
            IEnumerable<Message> b = db.Messages.Where(d => d.MFrom == uid).Where(d => d.MTo == id);
            List<Message> c = a.Union(b).ToList();
            for (var i = 0; i < c.Count(); i++)
            {
                db.Messages.Remove(c[i]);
                db.SaveChanges();
            }
            return RedirectToAction("index");
        }

        //删除一条信息
        public ActionResult delete(int id)
        {
            Message m = db.Messages.Find(id);            
            int uid;
            if(m.MTo == getCookie("id"))
                uid = m.MFrom;
            else uid = m.MTo;
            db.Messages.Remove(m);
            db.SaveChanges();
            return RedirectToAction("inbox", new { id = uid });
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

        public ActionResult isNew(string num)
        {
            lock (typeof(Environment))
            {
                int ID = getCookie("id");
                int NUM = Int32.Parse(num);
                User u = db.Users.First(d => d.UID == ID);
                if (u.UMessageNum != NUM)
                    return Content("1");
                else return Content("0");
            }
        }


    }
}
