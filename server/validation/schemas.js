import Joi from 'joi'; 

const schemas = { 
  article: Joi.object().keys({ 
    title: Joi.string().required(),
    previewImageURL: Joi.string().required(),
    articleBody: Joi.string().required()
  }) ,
  query: Joi.object().keys({ 
    name: Joi.string().required(),
    email: Joi.string().required(),
    queryBody: Joi.string().required()
  }) ,
  comment: Joi.object().keys({ 
    articleID: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    commentBody: Joi.string().required()
  }) ,
  like: Joi.object().keys({ 
    articleID: Joi.string().required(),
    email: Joi.string().required(),
    likeBool: Joi.boolean().required()
  }) 
  // future schemas will be defined here below ...
};

export default schemas;