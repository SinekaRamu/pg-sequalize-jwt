const Joi = require("joi");

const addFavSchema = Joi.object({
  item_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = { addFavSchema };
