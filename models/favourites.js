module.exports = function model(sequelize, types) {
  const favourites = sequelize.define(
    "favourites",
    {
      fav_id: {
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
      tableName: "favourites",
      timestamps: false,
    }
  );

  favourites.associate = function (models) {
    favourites.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    favourites.belongsTo(models.items, {
      as: "item",
      foreignKey: "item_id",
      targetKey: "item_id",
    });
  };
  return favourites;
};
