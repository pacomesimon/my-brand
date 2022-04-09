import Comment from "../models/Comment";

const commentController = {};

commentController.getAll = async (req, res) => {

  const comments = await Comment.find();
  res.send(comments);

};

commentController.post = async (req, res) => {

  const comment = new Comment({
    articleID: req.body.articleID,
    name: req.body.name,
    email : req.body.email,
    commentBody: req.body.commentBody
  });

  await comment.save();
  res.send(comment);
};

commentController.getOne = async (req, res) => {
  try {

    const comment = await Comment.find({ articleID: req.params.id });
    res.send(comment);

  } catch {

    res.status(404);
    res.send({ error: "Comment doesn't exist!" });

  }
};


commentController.delete = async (req, res) => {
  try {

    await Comment.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Comment doesn't exist!" });

  }
};



export default commentController;


