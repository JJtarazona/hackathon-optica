const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tratamientosFormula", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tratamiento: { type: DataTypes.STRING },
    clienteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    opticaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    formulaId: {
      type: DataTypes.UUID,
      allowNull: true, //
      references: {
        model: "formulas",
        key: "id",
      },
    },
  });
};
