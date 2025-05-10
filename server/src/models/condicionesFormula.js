const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("condicionesFormula", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    condicion: { type: DataTypes.STRING },
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
