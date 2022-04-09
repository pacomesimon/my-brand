import Joi from 'joi'; 

const middleware = (schema) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req.body); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    console.log("error", message); 
    console.log(req.body);
   res.status(422).json({ error: message }) } 
  } 
} 

export default middleware;
