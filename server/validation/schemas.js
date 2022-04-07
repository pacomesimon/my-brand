const Joi = require('joi') 
const schemas = { 
  blogPOST: Joi.object().keys({ 
    title: Joi.string().required(),
    content: Joi.string().required()
  }) 
  // future schemas will be defined here below ...
}; 
module.exports = schemas;