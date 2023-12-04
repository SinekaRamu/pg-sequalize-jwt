module.exports = function model(sequelize, types) {
  const items = sequelize.define(
    "items",
    {
      item_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      item_name: {
        type: types.STRING,
        allowNull: false,
      },
      item_content: {
        type: types.STRING,
        defaultValue: "",
      },
      item_price: {
        type: types.DECIMAL(10, 2),
        allowNull: false,
      },
      item_count: {
        type: types.INTEGER,
        defaultValue: 0,
      },
    },

    {
      tableName: "items",
    }
  );

  items.associate = function (models) {
    items.hasMany(models.favourites, {
      as: "favourites",
      foreignKey: "item_id",
      sourceKey: "item_id",
    });
    items.hasMany(models.ratings, {
      as: "ratings",
      foreignKey: "item_id",
      sourceKey: "item_id",
    });
    items.hasMany(models.carts, {
      as: "carts",
      foreignKey: "item_id",
      sourceKey: "item_id",
    });
    items.hasMany(models.purchases, {
      as: "purchases",
      foreignKey: "item_id",
      sourceKey: "item_id",
    });
  };

  return items;
};
