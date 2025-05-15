const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("itemsPedido", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cantidad: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.DECIMAL(10, 2) },
    pedidoId: {
      type: DataTypes.UUID,
      references: {
        model: "pedidos",
        key: "id",
      },
    },
    inventarioId: {
      type: DataTypes.UUID,
      references: {
        model: "inventarios",
        key: "id",
      },
    },
    opticaId: {
      type: DataTypes.STRING,
      references: {
        model: "opticas",
        key: "id",
      },
    },
  });
};
