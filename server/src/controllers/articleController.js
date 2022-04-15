import Article from "../models/Article";
import Like from "../models/Like";
import Comment from "../models/Comment";

const articleController = {};

articleController.getAll = async (req, res) => {

  const articles = await Article.find();
  res.send(articles);

};

articleController.post = async (req, res) => {
  if(!((req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send('Unauthorized action.');
  }
  const today = new Date();
  const article = new Article({
    title: req.body.title,
    previewImageURL : req.body.previewImageURL,
    articleBody: req.body.articleBody,
    authorID: req.user._id,
    date: JSON.stringify(today.toJSON()),
    subject: "TECH NEWS",
    readingTime: Math.ceil((req.body.articleBody.split(" ")).length * 7.7 /1000) + " MIN"

  });

  await article.save();
  res.send(article);
};

articleController.getOne = async (req, res) => {
  try {
    const singleArticle = {};
    singleArticle.article = await Article.findOne({ _id: req.params.id });
    if(!singleArticle.article){
      throw Error;
    }
    try {
      singleArticle.likes = await Like.find({ articleID: req.params.id });
    } catch {
      singleArticle.likes = [];  
    }
    try {
      singleArticle.comments = await Comment.find({ articleID: req.params.id });  
    } catch {  
      singleArticle.comments = [];  
    }
    res.send(singleArticle);

  } catch {

    res.status(404);
    res.send({ error: "Article doesn't exist!" });

  }
};

articleController.patch = async (req, res) => {
  if(!((req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send('Unauthorized action.');
  }
  try {
    const article = await Article.findOne({ _id: req.params.id });

    if (req.body.title) {
      article.title = req.body.title;
    }

    if (req.body.previewImageURL) {
      article.previewImageURL = req.body.previewImageURL;
    }

    if (req.body.articleBody) {
      article.articleBody = req.body.articleBody;
      article.readingTime = Math.ceil((req.body.articleBody.split(" ")).length * 7.7 /1000) + " MIN";
    }
    if (req.body.subject) {
      article.subject = req.body.subject;
    }

    await article.save();
    res.status(201);
    res.send(article);
  } catch {

    res.status(404);
    res.send({ error: "Article doesn't exist!" });

  }
};

articleController.delete = async (req, res) => {
  if(!((req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send('Unauthorized action.');
  }
  try {

    await Article.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Article doesn't exist!" });

  }
};



export default articleController;


