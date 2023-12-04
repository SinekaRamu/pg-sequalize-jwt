const Joi = require("joi");

const itemAddSchema = Joi.object({
  item_name: Joi.string().required(),
  item_content: Joi.string().required(),
  item_price: Joi.number().required(),
  item_count: Joi.number().required(),
});

const updateItemSchema = Joi.object({
  item_name: Joi.string().optional(),
  item_content: Joi.string().optional(),
  item_price: Joi.number().optional(),
  item_count: Joi.number().optional(),
});
module.exports = {
  itemAddSchema,
  updateItemSchema,
};
