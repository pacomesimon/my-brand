import Like from "../models/Like";

const likeController = {};

likeController.getAll = async (req, res) => {

  const likes = await Like.find();
  res.send(likes);

};

likeController.post = async (req, res) => {

  const storedLike = await Like.findOne({ email: req.body.email });
  console.log(storedLike);
  if(storedLike == null){
    const like = new Like({
      articleID: req.body.articleID,
      email : req.body.email,
      likeBool: req.body.likeBool
    });
  
    await like.save();
    res.send(like);
  }
  else{
    await Like.deleteOne({ email: req.body.email });
    res.status(204).send();
  }
  
};

likeController.getOne = async (req, res) => {
  try {

    const like = await Like.find({ articleID: req.params.id });
    res.send(like);

  } catch {

    res.status(404);
    res.send({ error: "Like doesn't exist!" });

  }
};


likeController.delete = async (req, res) => {
  try {

    await Like.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Like doesn't exist!" });

  }
};



export default likeController;


