const Joi = require("joi");

const ratingValueSchema = Joi.object({
  item_id: Joi.number().required(),
  user_id: Joi.number().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

module.exports = {
  ratingValueSchema,
};
