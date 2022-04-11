import Query from "../models/Query";

const queryController = {};

queryController.getAll = async (req, res) => {

  const queries = await Query.find();
  res.send(queries);

};

queryController.post = async (req, res) => {

  const query = new Query({
    name: req.body.name,
    email : req.body.email,
    queryBody: req.body.queryBody
  });

  await query.save();
  res.send(query);
};


queryController.delete = async (req, res) => {
  try {

    await Query.deleteOne({ _id: req.params.id });
    res.status(204).send();

  } catch {

    res.status(404);
    res.send({ error: "Query doesn't exist!" });

  }
};



export default queryController;


