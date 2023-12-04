const Joi = require("joi");

const addToCartSchema = Joi.object({
  item_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = {
  addToCartSchema,
};
