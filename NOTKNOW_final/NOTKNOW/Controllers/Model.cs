using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NOTKNOW.Models;

namespace NOTKNOW.Controllers
{
    //对数据库操作进行封装
    public class Model
    {
        private WebDbContext db = new WebDbContext();

        //增加用户
        public User addUser(string uName, string uEmail, string uPsw)
        {
            User user = new User();

            user.UName = uName;
            user.UEmail = uEmail;
            user.UPassword = uPsw;
            user.UPhoto = "/Content/res/1-1.jpg";

            db.Users.Add(user);
            db.SaveChanges();

            return user;
        }

        //由Email搜索用户
        public User findUserByEmail(string email)
        {
            return db.Users.FirstOrDefault(a => a.UEmail == email);
        }

        //由id搜索用户
        public User findUserByID(int id)
        {
            return db.Users.Find(id);
        }

        //按提问用户查找，并按时间排序
        public IEnumerable<Question> findQuestionByQUserID(int id)
        {
            IEnumerable<Question> question = db.Questions.Where(d => d.QUserID == id);
            return question.AsQueryable().OrderBy(d => d.QTime);
        }

        //按回答用户查找并按时间排序
        public IEnumerable<Answer> findAnswerByAUserID(int id)
        {
            IEnumerable<Answer> answer = db.Answers.Where(a => a.AUserID == id);
            return answer.AsQueryable().OrderBy(a => a.ATime);
        }

        //返回所有问题
        public IEnumerable<Question> getAllQuestions()
        {
            return db.Questions;
        }


        //首页新鲜事包括：他关注的话题下 点赞最多的回答       
        public IndexModel loadIndex(int id)
        {
            IndexModel im = new IndexModel();
            im.myUser = new User();
            im.myUser = db.Users.Find(id);
            im.info = new List<TopicInfo>();
            IEnumerable<FollowTopic> f = db.FollowTopics.Where(d => d.FTUserID == id);
            for (var i = 0; i < f.Count(); i++)
            {
                //关注话题下的热门问题
                List<TopicInfo> temp = getStarQuestion(id, f.ToList()[i].FollowingTID);
                //取前3个放入im.info
                for (var j = 0; j < 3 && j < temp.Count(); j++)
                {
                    TopicInfo ti = new TopicInfo();
                    ti = temp[j];
                    im.info.Add(ti);
                }
            }
            //新登录用户,自动推荐几个话题
            if (im.info.Count() == 0)
            {
                //话题
                List<TopicInfo> temp = getStarQuestion(id, 5);//未归类话题
                temp = orderByAUpvoteNum(temp);
                //取前3个放入im.info
                for (var j = 0; j < 3 && j < temp.Count(); j++)
                {
                    TopicInfo ti = new TopicInfo();
                    ti = temp[j];
                    im.info.Add(ti);
                }

            }
            im.info = orderByQTime(im.info);
            im.ua = getUserActivity(id);
            im.ua = orderByTime(im.ua);
            return im;
        }


        //获得某个话题的精华回答
        //参数：登陆用户id, 话题topicId
        public List<TopicInfo> getStarQuestion(int id, int topicID)
        {

            TopicStarModel tm = new TopicStarModel();
            tm.myUser = db.Users.Find(id);
            tm.topic = new TopicPreNext();
            tm.topic.topic = db.Topics.Find(topicID);
            tm.topic.fatherTopic = db.Topics.Find(tm.topic.topic.TFatherID);
            tm.topic.childTopic = db.Topics.Where(t => t.TFatherID == id).ToList();

            List<TopicQuestion> info = new List<TopicQuestion>();
            info.Add(getBestAnswerByTopic(tm.topic.topic));
            //for (int i = 0; i < tm.topic.childTopic.Count(); i++)
           // {
            //    info.Add(getBestAnswerByTopic(tm.topic.childTopic[i]));
           // }
            tm.question = new List<TopicInfo>();
            for (int i = 0; i < info.Count(); i++)
            {
                for (var j = 0; j < info[i].question.Count(); j++)
                {
                    if (info[i].HotAnswer[j].AUpvoteNum > 1)
                    {
                        TopicInfo tq = new TopicInfo();
                        tq.topic = info[i].topic;
                        tq.question = info[i].question[j];
                        tq.hotUser = info[i].HotUser[j];
                        tq.hotAnswer = info[i].HotAnswer[j];
                        tq.timeSpan = getTimeSpan(info[i].question[j].QTime);
                        tm.question.Add(tq);
                    }
                }
            }
            return tm.question;
        }


        public IEnumerable<Topic> findTopicByFUserID(int id)
        {
            IEnumerable<FollowTopic> ft = db.FollowTopics.Where(d => d.FTUserID == id);
            List<Topic> t = new List<Topic>();
            for (var i = 0; i < ft.Count(); i++)
            {
                Topic tp = new Topic();
                tp = db.Topics.Find(ft.ToList()[i].FollowingTID);
                t.Add(tp);
            }
            return t.AsEnumerable();
        }


        //返回某用户的所有信息
        public UserModel getAllUserInfo(int id)
        {
            UserModel um = new UserModel();
            um.myUser = db.Users.Find(id);
            um.questions = findQuestionByQUserID(id);
            um.answers = findAnswerByAUserID(id);
            um.topics = findTopicByFUserID(id);
            return um;

        }

        //修改用户信息
        public User editUserInfo(int id)
        {
            User user = db.Users.Find(id);

            db.SaveChanges();

            return user;
        }
        /*
        //某用户提了一个问题
        public Question addQuestion(Question question, int QUserID)
        {
            question.QUserID = QUserID;
            question.QState = "unknown";
            return question;
        }
        */
        //添加一个问题
        public void addQuestion(string content, string description, int UID)
        {
            Question q = new Question();
            q.QState = "unknown";
            q.QUserID = UID;
            q.QDescription = description;
            q.QContent = content;
            db.Questions.Add(q);
            User u = db.Users.Find(UID);
            u.UQuestionNum++;
            db.SaveChanges();
        }

        //添加一个问题
        public Question addQuestionByUser(Question question)
        {
            db.Questions.Add(question);
            User user = db.Users.Find(question.QUserID);
            user.UQuestionNum++;
            db.SaveChanges();
            return question;
        }

       
        //找到某个问题及其所有回答等信息
        public QuestionModel findQuestionInfoByQID(int id)
        {
            QuestionModel qm = new QuestionModel();
            qm.question = db.Questions.Find(id);
            qm.answers = db.Answers.Where(a => a.AQuestionID == id).ToList();
            qm.users = new List<User>();
            qm.CA = new List<CtoA>();
            for (int i = 0; i < qm.answers.Count(); i++)
            {
                qm.CA.Add(new CtoA());
                Answer aid = qm.answers.ToList()[i];
                qm.CA[i].aID = aid.AID;
                qm.CA[i].comments = db.Comments.Where(d => d.CAnswerID == aid.AID);//问题的所有评论
                qm.CA[i].users = new List<User>();
                for (int j = 0; j < qm.CA[i].comments.Count(); j++)//找到每个评论的作者信息
                {
                    int uid = qm.CA[i].comments.ToList()[j].CUserID;
                    User temp = db.Users.FirstOrDefault(d => d.UID == uid);
                    qm.CA[i].users.Add(temp);
                }
                qm.users.Add(db.Users.First(d => d.UID == aid.AUserID));//找到答案的作者
            }

            return qm;
        }

        //给问题增加回答
        public void addAnswerToQuestion(int UID, int QID, Answer answer)
        {
            answer.AQuestionID = QID;
            answer.AUserID = UID;
            answer.AStatus = "unknown";
            if (answer.AContent == null)
                answer.AContent = "";
            db.Answers.Add(answer);

            Question question = db.Questions.Find(QID);
            question.QAnswerNum++;

            User user = db.Users.Find(UID);
            user.UAnswerNum++;

            db.SaveChanges();
        }

        //修改问题
        public void editQuestionByID(int id, string QContent, string QDescription)
        {
            Question question = db.Questions.Find(id);
            if (QContent != "")
            {
                question.QContent = QContent;
                question.QDescription = QDescription;
                db.SaveChanges();
            }
        }

        //修改回答
        public Answer editAnswerByID(int id, string AContent)
        {
            Answer answer = db.Answers.Find(id);
            if (AContent != "")
            {
                answer.AContent = AContent;
                db.SaveChanges();
            }
            return answer;
        }

        //删除回答
        public Question deleteAnswerByID(int id)
        {
            Answer answer = db.Answers.Find(id);
            User user = db.Users.Find(answer.AUserID);
            user.UAnswerNum--;
            Question question = db.Questions.Find(answer.AQuestionID);
            question.QAnswerNum--;
            db.Answers.Remove(answer);
            db.SaveChanges();

            return question;
        }

        //给回答点赞、反对和没有帮助
        //1表示点赞，2表示取消点赞，3表示反对，4表示取消反对，5表示没有帮助，6表示取消没有帮助，7表示举报
        public void changeAnswerNum(int AID, int type)
        {
            Answer answer = db.Answers.Find(AID);
            switch (type)
            {
                case 1:
                    answer.AUpvoteNum++;
                    break;
                case 2:
                    answer.AUpvoteNum--;
                    break;
                case 3:
                    answer.ADownvoteNum++;
                    break;
                case 4:
                    answer.ADownvoteNum--;
                    break;
                case 5:
                    answer.AUselessNum++;
                    break;
                case 6:
                    answer.AUselessNum--;
                    break;
                default:
                    answer.AReportNum++;
                    break;
            }
            db.SaveChanges();
        }

        //通过答案获取该答案的用户
        public User getUserByAnswerID(int id)
        {
            Answer answer = db.Answers.Find(id);
            User user = db.Users.Find(answer.AUserID);
            return user;
        }

        //获取综合评价最好的某个问题的答案
        public Answer getHotAnswerByQuestionID(int id)
        {
            List<Answer> answer = db.Answers.Where(a => a.AQuestionID == id).ToList();
            Answer HotAnswer = new Answer();
            if (answer.Count() == 0)
            {
                HotAnswer.ATime = db.Questions.Find(id).QTime;
                HotAnswer.AQuestionID = id;
                HotAnswer.AStatus = "unknown";
                HotAnswer.AContent = " ";
                HotAnswer.AUserID = 0;
            }
            else
            {
                HotAnswer = answer[0];
                int evaluation = 0;
                for (int i = 1; i < answer.Count(); i++)
                {
                    evaluation = answer[i].AUpvoteNum - answer[i].ADownvoteNum - answer[i].AUselessNum;
                    if (evaluation >= HotAnswer.AUpvoteNum - HotAnswer.ADownvoteNum - HotAnswer.AUselessNum)
                    {
                        HotAnswer = answer[i];
                    }
                }
            }
            return HotAnswer;
        }

        //获取某话题下的问题和某个评价最好的答案
        public TopicQuestion getBestAnswerByTopic(Topic topic)
        {
            TopicQuestion tq = new TopicQuestion();
            tq.topic = topic;
            tq.question = new List<Question>();
            tq.question = db.Questions.Where(d => d.QTopicType1 == topic.TID).ToList();
            tq.HotAnswer = new List<Answer>();
            tq.HotUser = new List<User>();
            for (int i = 0; i < tq.question.Count(); i++)
            {
                Answer answer = getHotAnswerByQuestionID(tq.question[i].QID);
                tq.HotAnswer.Add(answer);
                tq.HotUser.Add(findUserByID(answer.AUserID));
            }
            return tq;
        }

        //按照时间排序
        public List<TopicInfo> orderByQTime(List<TopicInfo> info)
        {
            TopicInfo temp;
            for (int i = 0; i < info.Count(); i++)
            {
                for (int j = info.Count() - 1; j > i; j--)
                {
                    if (info[j].question.QTime.ToOADate() > info[j - 1].question.QTime.ToOADate())
                    {
                        temp = new TopicInfo();
                        temp = info[j];
                        info[j] = info[j - 1];
                        info[j - 1] = temp;
                    }
                }
            }
            return info;
        }

        //按照时间排序
        public List<TopicAllQuestion> orderByQTime(List<TopicAllQuestion> info)
        {
            TopicAllQuestion temp;
            for (int i = 0; i < info.Count(); i++)
            {
                for (int j = info.Count() - 1; j > i; j--)
                {
                    if (info[j].question.QTime.ToOADate() > info[j - 1].question.QTime.ToOADate())
                    {
                        temp = new TopicAllQuestion();
                        temp = info[j];
                        info[j] = info[j - 1];
                        info[j - 1] = temp;
                    }
                }
            }
            return info;
        }

        //计算时间和当前时间的时间差
        public string getTimeSpan(DateTime time)
        {
            string span = null;
            DateTime present = DateTime.Now;
            TimeSpan t1 = new TimeSpan(present.Ticks);
            TimeSpan t2 = new TimeSpan(time.Ticks);
            TimeSpan ts = t1.Subtract(t2).Duration();
            if (ts.Days != 0)
            {
                span = ts.Days.ToString() + "天前";
            }
            else
            {
                if (ts.Hours != 0)
                {
                    span = ts.Hours.ToString() + "小时前";
                }
                else
                {
                    if (ts.Minutes != 0)
                    {
                        span = ts.Minutes.ToString() + "分钟前";
                    }
                    else
                    {
                        if (ts.Seconds != 0)
                        {
                            span = ts.Seconds.ToString() + "秒前";
                        }
                        else
                            span = "刚刚";
                    }
                }
            }
            return span;
        }

        //按照评价数排序
        public List<TopicInfo> orderByAUpvoteNum(List<TopicInfo> info)
        {
            TopicInfo temp;
            for (int i = 0; i < info.Count(); i++)
            {
                for (int j = info.Count() - 1; j > i; j--)
                {
                    if (info[j].hotAnswer.AUpvoteNum > info[j - 1].hotAnswer.AUpvoteNum)
                    {
                        temp = new TopicInfo();
                        temp = info[j];
                        info[j] = info[j - 1];
                        info[j - 1] = temp;
                    }
                }
            }
            return info;
        }

        //TODO: edit by wyt所有的私信
        public MessageModel getAllMessage(int id)
        {
            MessageModel m = new MessageModel();
            m.packs = new List<MessagePack>();
            IEnumerable<Message> send = db.Messages.Where(c => c.MFrom == id).Where(d => d.MType == 3);
            IEnumerable<Message> receive = db.Messages.Where(c => c.MTo == id).Where(d => d.MType == 3);
            IEnumerable<Message> mp = send.Union(receive);//找到所有跟我id相关的信息, 3== 私信
            var j = 0;
            int inboxId;
            for (var i = 0; i < mp.Count(); i++)
            {
                inboxId = mp.ToList()[i].MFrom == id ? (mp.ToList()[i].MTo) : (mp.ToList()[i].MFrom);//联系人id
                for (j = 0; j < m.packs.Count(); j++)
                {
                    if (m.packs[j].id == inboxId) //已经有和该用户的通讯记录
                    {
                        Message mail = mp.ToList()[i];
                        m.packs[j].messages.Add(mail);
                        break;
                    }
                }
                if (j == m.packs.Count())//没有和该用户的通讯记录
                {
                    Message newM = new Message();
                    newM = mp.ToList()[i];
                    MessagePack newpack = new MessagePack();
                    newpack.id = inboxId;
                    newpack.me = db.Users.First(d => d.UID == id);
                    newpack.friend = db.Users.Find(inboxId);
                    newpack.messages = new List<Message>();
                    newpack.messages.Add(newM);
                    m.packs.Add(newpack);
                }
            }
            for (var i = 0; i < m.packs.Count(); i++)
            {
                m.packs[i].messages = orderByQTime(m.packs[i].messages);
            }
            return m;
        }


        //发送一条消息
        public void sendMessage(int to, int from, string content, int type)
        {
            Message m = new Message();
            m.MTo = to;
            m.MFrom = from;
            m.MContent = content;
            m.MType = type;
            m.MStatus = "unread";
            db.Messages.Add(m);
            db.SaveChanges();
        }

        //按照时间排序
        public List<Message> orderByQTime(List<Message> info)
        {
            Message temp;
            for (int i = 0; i < info.Count(); i++)
            {
                for (int j = info.Count() - 1; j > i; j--)
                {
                    if (info[j].MTime.ToOADate() > info[j - 1].MTime.ToOADate())
                    {
                        temp = new Message();
                        temp = info[j];
                        info[j] = info[j - 1];
                        info[j - 1] = temp;
                    }
                }
            }
            return info;
        }

        //按照用户名和个人介绍进行搜索
        public List<List<User>> selectByUName(string UName)
        {
            List<List<User>> result = new List<List<User>>();

            List<User> user = new List<User>();
            List<User> user1 = new List<User>();

            String[] name = UName.Split(' ');
            String b;

            for (int i = 0; i < name.Count(); i++)
            {
                b = name[i];
                if (i == 0)
                {
                    user = db.Users.Where(a => a.UName.Contains(b) == true).ToList();
                }
                else
                {
                    user.AddRange(db.Users.Where(a => a.UName.Contains(b) == true).ToList().Except(user));
                }
                user.AddRange(db.Users.Where(a => a.UIntroduction.Contains(b) == true).ToList().Except(user));

                for (int j = 0; j < name[i].Count(); j++)
                {
                    String c = name[i][j].ToString();
                    if (i == 0 && j == 0)
                    {
                        user1 = db.Users.Where(a => a.UName.Contains(c) == true).ToList();
                    }
                    else
                    {
                        user1.AddRange(db.Users.Where(a => a.UName.Contains(c) == true).ToList().Except(user1));
                    }
                    user1.AddRange(db.Users.Where(a => a.UIntroduction.Contains(c) == true).ToList().Except(user1));
                }
            }

            result.Add(user);
            result.Add(user1.Except(user).ToList());

            return result;
        }


        //按照话题内容和话题简介进行搜索
        public List<List<Topic>> selectByTContent(string TContent)
        {
            List<List<Topic>> result = new List<List<Topic>>();
            List<Topic> topic = new List<Topic>();
            List<Topic> topic1 = new List<Topic>();

            String[] content = TContent.Split(' ');
            String b;

            for (int i = 0; i < content.Count(); i++)
            {
                b = content[i];
                if (i == 0)
                {
                    topic = db.Topics.Where(a => a.TContent.Contains(b) == true).ToList();
                }
                else
                {
                    topic.AddRange(db.Topics.Where(a => a.TContent.Contains(b) == true).ToList().Except(topic));
                }
                topic.AddRange(db.Topics.Where(a => a.TDescription.Contains(b) == true).ToList().Except(topic));

                for (int j = 0; j < content[i].Count(); j++)
                {
                    String c = content[i][j].ToString();
                    if (i == 0 && j == 0)
                    {
                        topic1 = db.Topics.Where(a => a.TContent.Contains(c) == true).ToList();
                    }
                    else
                    {
                        topic1.AddRange(db.Topics.Where(a => a.TContent.Contains(c) == true).ToList().Except(topic1));
                    }
                    topic1.AddRange(db.Topics.Where(a => a.TDescription.Contains(c) == true).ToList().Except(topic1));
                }
            }

            result.Add(topic);
            result.Add(topic1.Except(topic).ToList());

            return result;
        }

        //按照关键词进行搜索
        public List<List<Question>> selectByKeywords(string keywords)
        {
            List<List<Question>> result = new List<List<Question>>();
            List<Question> question = new List<Question>();
            List<Question> question1 = new List<Question>();

            String[] content = keywords.Split(' ');
            String b;

            for (int i = 0; i < content.Count(); i++)
            {
                b = content[i];
                if (i == 0)
                {
                    question = db.Questions.Where(a => a.QContent.Contains(b) == true).ToList();
                }
                else
                {
                    question.AddRange(db.Questions.Where(a => a.QContent.Contains(b) == true).ToList().Except(question));
                }
                question.AddRange(db.Questions.Where(a => a.QDescription.Contains(b) == true).ToList().Except(question));

                for (int j = 0; j < content[i].Count(); j++)
                {
                    String c = content[i][j].ToString();
                    if (i == 0 && j == 0)
                    {
                        question1 = db.Questions.Where(a => a.QContent.Contains(c) == true).ToList();
                    }
                    else
                    {
                        question1.AddRange(db.Questions.Where(a => a.QContent.Contains(c) == true).ToList().Except(question1));
                    }
                    question1.AddRange(db.Questions.Where(a => a.QDescription.Contains(c) == true).ToList().Except(question1));
                }
            }

            result.Add(question);
            result.Add(question1.Except(question).ToList());

            return result;
        }

        //搜索问题是否包含敏感词
        public bool searchWord(String question)
        {
            List<Word> word = db.Words.ToList();
            for (int i = 0; i < word.Count(); i++)
            {
                String s = word[i].Wword;
                if (question.IndexOf(s) < question.Length - s.Length && question.IndexOf(s) >= 0)
                    return true;
            }
            return false;
        }

        //获得所关注用户的所有动态
        //参数：当前用户id
        public List<UserActivity> getUserActivity(int id)
        {
            List<UserActivity> UA = new List<UserActivity>();
            IEnumerable<FollowUser> users = db.FollowUsers.Where(d => d.FUUserID == id).ToList();
            for (var i = 0; i < users.Count(); i++)
            {
                UserActivity temp = new UserActivity();
                temp.keyUser = db.Users.Find(users.ToList()[i].FollowingUID);
                temp.answer = new Answer();
                int uID = temp.keyUser.UID;
                IEnumerable<Answer> tempA = db.Answers.Where(d => d.AUserID == uID);
                if (tempA.Count() == 0) continue;
                tempA = tempA.OrderByDescending(d => d.ATime);
                temp.answer = tempA.FirstOrDefault(d => d.AUserID == uID);
                temp.topic = null;
                temp.question = db.Questions.First(d => d.QID == temp.answer.AQuestionID);
                temp.time = temp.answer.ATime;
                temp._time = getTimeSpan(temp.time);
                temp.flag = 'a';//回答了某个问题
                UA.Add(temp);
            }
            for (var i = 0; i < users.Count(); i++)
            {
                UserActivity temp = new UserActivity();
                temp.keyUser = db.Users.Find(users.ToList()[i].FollowingUID);
                int uID = temp.keyUser.UID;
                temp.question = new Question();
                IEnumerable<Question> tempA = db.Questions.Where(d => d.QUserID == uID);
                if (tempA.Count() == 0) continue;
                tempA = tempA.OrderByDescending(d => d.QTime);
                temp.question = tempA.FirstOrDefault(d => d.QUserID == uID);
                temp.time = temp.question.QTime;
                temp._time = getTimeSpan(temp.time);
                temp.answer = null;
                temp.topic = null;
                temp.flag = 'q';//关注用户提了问题
                if (temp.question != null) UA.Add(temp);
            }
            for (var i = 0; i < users.Count(); i++)
            {
                UserActivity temp = new UserActivity();
                temp.keyUser = db.Users.Find(users.ToList()[i].FollowingUID);
                int uID = temp.keyUser.UID;
                temp.question = null;
                temp.answer = null;
                IEnumerable<FollowTopic> ft = db.FollowTopics.Where(d => d.FTUserID == uID);
                if (ft.Count() == 0) continue;
                ft = ft.OrderByDescending(d => d.FTID);
                FollowTopic a = ft.FirstOrDefault(d => d.FTUserID == uID);
                if (a == null) continue;
                temp.topic = db.Topics.FirstOrDefault(d => d.TID == a.FollowingTID);
                if (temp.topic == null) continue;
                //TODO: 修改数据库后更改此处，应该是followTopic的时间
                temp.time = a.FTTime;
                temp._time = getTimeSpan(temp.time);
                temp.flag = 't';//关注了话题
                UA.Add(temp);
            }

            for (var i = 0; i < users.Count(); i++)
            {
                UserActivity temp = new UserActivity();
                temp.keyUser = db.Users.Find(users.ToList()[i].FollowingUID);
                temp.answer = null;
                IEnumerable<FollowQuestion> ft = db.FollowQuestions.Where(d => d.FQUserID == temp.keyUser.UID);
                if (ft.Count() == 0) continue;
                ft = ft.OrderByDescending(d => d.FQID);
                FollowQuestion fq = ft.FirstOrDefault();
                if (fq == null) continue;
                temp.question = db.Questions.Find(fq.FollowingQID);
                //TODO: 修改数据库后更改此处，应该是followTopic的时间
                temp.time = fq.FQTime;
                temp._time = getTimeSpan(temp.time);
                temp.flag = 'q';//关注了问题
                UA.Add(temp);
            }
            return UA;
        }

        //把UserActivity按照时间排序
        public List<UserActivity> orderByTime(List<UserActivity> info)
        {
            UserActivity temp;
            for (int i = 0; i < info.Count(); i++)
            {
                for (int j = info.Count() - 1; j > i; j--)
                {
                    if (info[j].time.ToOADate() > info[j - 1].time.ToOADate())
                    {
                        temp = new UserActivity();
                        temp = info[j];
                        info[j] = info[j - 1];
                        info[j - 1] = temp;
                    }
                }
            }
            return info;
        }

        //获取某话题的三个最新的问题
        public TQ getTopThreeQuestionByTopicID(int id)
        {
            TQ tq = new TQ();
            tq.topic = db.Topics.Find(id);
            tq.question = new List<TimeQuestion>();
            List<Question> question = db.Questions.Where(a => a.QTopicType1 == id).ToList();
            question = orderByQTime(question);
            for (int i = 0; i < question.Count() && i < 3; i++)
            {
                TimeQuestion add = new TimeQuestion();
                add.question = question[i];
                add.timespan = getTimeSpan(question[i].QTime);
                tq.question.Add(add);
            }
            return tq;
        }

        //按照时间排序
        public List<Question> orderByQTime(List<Question> info)
        {
            Question temp;
            for (int i = 0; i < info.Count(); i++)
            {
                for (int j = info.Count() - 1; j > i; j--)
                {
                    if (info[j].QTime.ToOADate() > info[j - 1].QTime.ToOADate())
                    {
                        temp = new Question();
                        temp = info[j];
                        info[j] = info[j - 1];
                        info[j - 1] = temp;
                    }
                }
            }
            return info;
        }

        //添加敏感词
        public void addWord(String content)
        {
            String[] words = content.Split(' ');
            for (int i = 0; i < words.Count(); i++)
            {
                String b = words[i];
                IEnumerable<Word> test = db.Words.Where(a => a.Wword.Contains(b) == true);
                if (test.Count() == 0)
                {
                    Word add = new Word();
                    add.Wword = words[i];
                    db.Words.Add(add);
                    db.SaveChanges();
                }
            }
        }
    }
}