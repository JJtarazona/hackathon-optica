const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("formula", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fecha: { type: DataTypes.DATEONLY },
    optometrista: { type: DataTypes.STRING },
    add: { type: DataTypes.STRING },
    tipoLente: { type: DataTypes.STRING },
    material: { type: DataTypes.STRING },
    observaciones: { type: DataTypes.TEXT },
    // Campos para OD (Ojo Derecho)
    od_sph: { type: DataTypes.DECIMAL(5, 2) },
    od_cyl: { type: DataTypes.DECIMAL(5, 2) },
    od_axis: { type: DataTypes.INTEGER },
    od_dp: { type: DataTypes.DECIMAL(5, 2) },
    od_add: { type: DataTypes.DECIMAL(5, 2) },
    // Campos para OS (Ojo Izquierdo)
    os_sph: { type: DataTypes.DECIMAL(5, 2) },
    os_cyl: { type: DataTypes.DECIMAL(5, 2) },
    os_axis: { type: DataTypes.INTEGER },
    os_dp: { type: DataTypes.DECIMAL(5, 2) },
    os_add: { type: DataTypes.DECIMAL(5, 2) },
    clienteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    opticaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
