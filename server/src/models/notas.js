const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("notas", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    contenido: { type: DataTypes.TEXT },
    fecha: { type: DataTypes.DATE },
  });
};
