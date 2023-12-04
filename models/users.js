const helper = require("../services/helper");
const bcrypt = require("bcryptjs");

module.exports = function model(sequelize, types) {
  const users = sequelize.define(
    "users",
    {
      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
        defaultValue: "",
      },
      last_name: {
        type: types.STRING,
        defaultValue: "",
      },
      user_name: {
        type: types.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: types.STRING,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: types.STRING,
        allowNull: false,
      },
      phone_no: {
        type: types.STRING,
        defaultValue: "",
      },
    },
    {
      tableName: "users",
    }
  );

  users.associate = function (models) {
    users.hasMany(models.carts, {
      as: "carts",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    users.hasMany(models.purchases, {
      as: "purchases",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    users.hasMany(models.favourites, {
      as: "favourites",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    users.hasMany(models.ratings, {
      as: "ratings",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };

  users.beforeCreate(async (user) => {
    try {
      if (user.user_password) {
        user.user_password = await helper.hashPassword(user.user_password);
      }
    } catch (error) {
      console.log("\n hash error on save password..", error);
    }
  });

  users.addHook("beforeUpdate", async (user) => {
    try {
      if (user.changed("user_password") && user.user_password) {
        user.user_password = await commonService.hashPassword(
          user.user_password
        );
      }
    } catch (error) {
      console.log("\n hash error on update password..", error);
    }
  });

  return users;
};
