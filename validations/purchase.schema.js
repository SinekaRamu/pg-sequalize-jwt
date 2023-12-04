const Joi = require("joi");

const buyItemSchema = Joi.object({
  item_id: Joi.number().required(),
  user_id: Joi.number().required(),
  date_of_order: Joi.date().allow(),
  order_status: Joi.string().required(),
});

module.exports = { buyItemSchema };
