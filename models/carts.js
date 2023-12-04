module.exports = function model(sequelize, types) {
  const carts = sequelize.define(
    "carts",
    {
      cart_id: {
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
    },

    {
      tableName: "carts",
    }
  );

  carts.associate = function (models) {
    carts.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    carts.belongsTo(models.items, {
      as: "item",
      foreignKey: "item_id",
      targetKey: "item_id",
    });
  };

  return carts;
};
