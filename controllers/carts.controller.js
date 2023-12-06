const { models } = require("../config/sequelize-config");

async function addToCartController(req, res) {
  try {
    const addCart = await models.carts.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      addCart,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
}

module.exports = {
  addToCartController,
};
