const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

// To add favourite
const addfavouritecontroller = async (req, res) => {
  try {
    const favouriteCreate = await models.favourites.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      favouriteCreate,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const getFavController = async (req, res) => {
  try {
    let minPrice;
    let maxPrice;

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      minPrice = parseFloat(priceRanges[0]);
      maxPrice = parseFloat(priceRanges[1]);
    }
    const getFavourites = await models.items.findAll({
      include: [
        {
          model: models.favourites,
          // as: favourites,
          where: { user_id: req.query.user },
        },
      ],
      where: {
        item_name: {
          [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
        },
        item_price: {
          [Sequelize.Op.between]: [minPrice, maxPrice],
        },
      },
      order: [
        [
          "item_price",
          req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
            ? "DESC"
            : "ASC",
        ],
      ],
      attributes: ["item_name", "item_price"],
    });

    res.json({
      getFavourites,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addfavouritecontroller,
  getFavController,
};
