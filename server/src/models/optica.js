const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("optica", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
