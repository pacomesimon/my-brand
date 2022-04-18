import Joi from 'joi'; 

const schemas = { 
  user: Joi.object().keys({ 
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }) ,
  article: Joi.object().keys({ 
    title: Joi.string().required(),
    previewImageURL: Joi.string().required(),
    articleBody: Joi.string().required()
  }) ,
  articlePatch: Joi.object().keys({ 
    title: Joi.string(),
    previewImageURL: Joi.string(),
    articleBody: Joi.string(),
    subject: Joi.string()
  }) ,
  query: Joi.object().keys({
    queryBody: Joi.string().required()
  }) ,
  comment: Joi.object().keys({ 
    articleID: Joi.string().required(),
    commentBody: Joi.string().required()
  }) ,
  like: Joi.object().keys({ 
    articleID: Joi.string().required()
  }) 
  // future schemas will be defined here below ...
};

export default schemas;