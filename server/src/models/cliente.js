const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cliente", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING },
    direccion: { type: DataTypes.TEXT },
    fechaRegistro: { type: DataTypes.DATEONLY },
    deudaPendiente: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    notasCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    avatarUrl: { type: DataTypes.STRING },
    opticaId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "opticas",
        key: "id",
      },
    },
  });
};
