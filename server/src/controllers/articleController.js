import Article from "../models/Article";

const articleController = {};

articleController.getAll = async (req, res) => {

  const articles = await Article.find();
  res.send(articles);

};

articleController.post = async (req, res) => {

  const article = new Article({
    title: req.body.title,
    previewImageURL : req.body.previewImageURL,
    articleBody: req.body.articleBody
  });

  await article.save();
  res.send(article);
};

articleController.getOne = async (req, res) => {
  try {

    const article = await Article.findOne({ _id: req.params.id });
    res.send(article);

  } catch {

    res.status(404);
    res.send({ error: "Article doesn't exist!" });

  }
};

articleController.patch = async (req, res) => {
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
  try {

    await Article.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Article doesn't exist!" });

  }
};



export default articleController;


