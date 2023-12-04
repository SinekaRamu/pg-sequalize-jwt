module.exports = function model(sequelize, types) {
  const purchases = sequelize.define(
    "purchases",
    {
      purchase_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      user_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      item_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "items",
          },
          key: "item_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      date_of_order: {
        type: types.DATE,
        defaultValue: types.NOW,
      },
      order_status: {
        type: types.STRING,
        allowNull: false,
      },
    },

    {
      tableName: "purchases",
    }
  );

  purchases.associate = function (models) {
    purchases.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    purchases.belongsTo(models.items, {
      as: "item",
      foreignKey: "item_id",
      targetKey: "item_id",
    });
  };

  return purchases;
};
