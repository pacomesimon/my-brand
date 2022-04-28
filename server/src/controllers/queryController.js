import Query from "../models/Query";

const queryController = {};

queryController.getAll = async (req, res) => {
  if(!((req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send({error:'Unauthorized action.'});
  }
  const queries = await Query.find();
  res.send(queries);

};

queryController.post = async (req, res) => {
  const today = new Date();
  const query = new Query({
    userID : req.user._id,
    name: req.user.name,
    email : req.user.email,
    queryBody: req.body.queryBody,
    date: JSON.stringify(today.toJSON())
  });

  await query.save();
  res.send(query);
};


queryController.delete = async (req, res) => {
  if(!((req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com" ))){
    return res.status(401).send({error:'Unauthorized action.'});
  }
  try {

    await Query.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Query doesn't exist!" });

  }
};



export default queryController;


