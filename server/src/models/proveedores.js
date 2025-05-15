const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("proveedores", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING },
    contacto: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    direccion: { type: DataTypes.TEXT },
    tipo: { type: DataTypes.STRING },
    notas: { type: DataTypes.TEXT },
    opticaId: {
      type: DataTypes.STRING,
      references: {
        model: "opticas",
        key: "id",
      },
    },
  });
};
