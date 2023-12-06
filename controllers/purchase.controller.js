const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addPurchaseController = async (req, res) => {
  try {
    const purchase = await models.purchases.create({
      item_id: req.xop.item_id,
      user_id: req.xop.user_id,
      order_status: req.xop.order_status,
    });
    const updatedItem = await models.items.decrement("item_count", {
      by: 1,
      where: {
        item_id: req.body.item_id,
      },
    });

    res.json({
      purchase,
      updatedItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
const PurchasesListController = async (req, res) => {
  try {
    let sortPrice;
    const userId = req.params.user_id;
    let whereQuery = {};
    let orderQuery = [];

    //search by item_name
    if (req.query.search) {
      whereQuery.item_name = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }

    if (req.query.sortPrice) {
      sortPrice = req.query.sortPrice;
      orderQuery.push(["item_price", sortPrice]);
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);
      whereQuery.item_price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    const list = await models.purchases.findAll({
      where: {
        user_id: req.query.user_id,
      },
      order: [[models.items, "item_price", sortPrice ? sortPrice : "DESC"]],
      logging: true,
      include: [
        {
          as: "purchases",
          model: models.items,
          right: true,
          where: whereQuery,
        },
      ],
    });

    return res.json({
      list,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// update to cancel
const updateStatusController = async function (req, res) {
  try {
    const updateStatus = await models.purchases.update(
      {
        order_status: req.body.order_status,
      },
      {
        where: {
          purchase_id: req.body.purchase_id,
        },
        returning: true,
      }
    );

    res.json({ updateStatus });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//cancel
const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    let minPrice;
    let maxPrice;
    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      minPrice = parseFloat(priceRanges[0]);
      maxPrice = parseFloat(priceRanges[1]);
    }
    const getCancelOrder = await models.items.findAll({
      include: [
        {
          model: models.purchases,
          where: { user_id: req.query.user_id },
          where: {
            order_status: "Cancelled",
          },
        },
      ],
      where: {
        [Op.and]: [
          {
            item_name: {
              [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
            },
          },
          {
            item_price: { [Sequelize.Op.between]: [minPrice, maxPrice] },
          },
        ],
      },
      order: [
        [
          "item_price",
          req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
            ? "DESC"
            : "ASC",
        ],
      ],
    });

    res.json({
      getCancelOrder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPurchaseController,
  PurchasesListController,
  updateStatusController,
  cancelListController,
};
