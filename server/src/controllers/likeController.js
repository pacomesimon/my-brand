import Like from "../models/Like";

const likeController = {};

likeController.getAll = async (req, res) => {
  if(!(req.user._id == req.params.id || (req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
      return res.status(401).send({error:'Unauthorized action.'});
  }
  const likes = await Like.find();
  res.send(likes);

};

likeController.post = async (req, res) => {

  const storedLike = await Like.findOne({ 
    articleID: req.body.articleID,
    userID : req.user._id  
  });
  if(storedLike == null){
    const like = new Like({
      articleID: req.body.articleID,
      userID : req.user._id
    });
  
    await like.save();
    res.send(like);
  }
  else{
    await Like.deleteOne({ 
      articleID: req.body.articleID,
      userID : req.user._id 
    });
    res.status(204).send();
  }
  
};

likeController.getOne = async (req, res) => {
  if(!(req.user._id == req.params.id || (req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send({error:'Unauthorized action.'});
  }
  try {

    const like = await Like.find({ articleID: req.params.id });
    res.send(like);

  } catch {

    res.status(404);
    res.send({ error: "Like doesn't exist!" });

  }
};


likeController.delete = async (req, res) => {
  if(!(req.user._id == req.params.id || (req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send({error:'Unauthorized action.'});
  }
  try {

    await Like.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Like doesn't exist!" });

  }
};



export default likeController;


