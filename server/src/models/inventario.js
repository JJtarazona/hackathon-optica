const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("inventario", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.ENUM,
      values: [
        "Armazón",
        "Lente Oftálmico",
        "Gafa de Sol",
        "Lente de Contacto",
        "Accesorio",
        "Otro",
      ],
    },
    nombre: { type: DataTypes.STRING },
    marca: { type: DataTypes.STRING },
    material: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    indice: { type: DataTypes.STRING }, // Para lentes
    duracion: { type: DataTypes.STRING }, // Para lentes de contacto
    stock: { type: DataTypes.INTEGER },
    precioCompra: { type: DataTypes.DECIMAL(10, 2) },
    precioVenta: { type: DataTypes.DECIMAL(10, 2) },
    opticaId: {
      type: DataTypes.UUID,
      references: {
        model: "opticas",
        key: "id",
      },
    },
  });
};
