require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Determinar si usar base de datos local o desplegada
const isLocal = process.env.USE_LOCAL === "true";

// Configuración de conexión local
const localConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: "postgres",
};

// Configuración de conexión desplegada
const deployedConfig = {
  url: process.env.SUPABASE_URL,
  dialect: "postgres",
  dialectModule: require("pg"),
  logging: false,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

// Crear instancia de Sequelize
const sequelize = isLocal
  ? new Sequelize(
      `postgres://${localConfig.username}:${localConfig.password}@${localConfig.host}:${localConfig.port}/${localConfig.database}`,
      {
        dialect: localConfig.dialect,
      }
    )
  : new Sequelize(deployedConfig.url, deployedConfig);

// Leer archivos de modelos
const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//*========================  Modelos Importados  ===========================//
const {
  Cliente,
  Formula,
  Cita,
  Notas,
  TratamientosFormula,
  CondicionesFormula,
  Pedidos,
  ItemsPedido,
  Entregas,
  Facturas,
  Inventario,
  Proveedores,
  Optica,
} = sequelize.models;

//*========================  Relaciones de las tablas  ===========================//

// Cliente tiene muchas fórmulas
Cliente.hasMany(Formula, { foreignKey: "clienteId" });
Formula.belongsTo(Cliente, { foreignKey: "clienteId" });

// Cliente tiene muchas citas
Cliente.hasMany(Cita, { foreignKey: "clienteId" });
Cita.belongsTo(Cliente, { foreignKey: "clienteId" });

// Cliente tiene muchas notas
Cliente.hasMany(Notas, { foreignKey: "clienteId" });
Notas.belongsTo(Cliente, { foreignKey: "clienteId" });

// Fórmula tiene muchos tratamientos
Formula.hasMany(TratamientosFormula, { foreignKey: "formulaId" });
TratamientosFormula.belongsTo(Formula, { foreignKey: "formulaId" });

// Fórmula tiene muchas condiciones
Formula.hasMany(CondicionesFormula, { foreignKey: "formulaId" });
CondicionesFormula.belongsTo(Formula, { foreignKey: "formulaId" });

// Pedido pertenece a un cliente
Pedidos.belongsTo(Cliente, { foreignKey: "clienteId" });
Cliente.hasMany(Pedidos, { foreignKey: "clienteId" });

// Pedido tiene muchos items
Pedidos.hasMany(ItemsPedido, { foreignKey: "pedidoId" });
ItemsPedido.belongsTo(Pedidos, { foreignKey: "pedidoId" });

// ItemPedido pertenece a un producto del inventario
ItemsPedido.belongsTo(Inventario, { foreignKey: "itemId" });
Inventario.hasMany(ItemsPedido, { foreignKey: "itemId" });

// Entrega pertenece a un pedido
Entregas.belongsTo(Pedidos, { foreignKey: "pedidoId" });
Pedidos.hasOne(Entregas, { foreignKey: "pedidoId" });

// Factura pertenece a un cliente
Facturas.belongsTo(Cliente, { foreignKey: "clienteId" });
Cliente.hasMany(Facturas, { foreignKey: "clienteId" });

// Factura puede estar asociada a un pedido
Facturas.belongsTo(Pedidos, { foreignKey: "pedidoId" });
Pedidos.hasOne(Facturas, { foreignKey: "pedidoId" });

// Inventario pertenece a un proveedor
Inventario.belongsTo(Proveedores, { foreignKey: "proveedorId" });
Proveedores.hasMany(Inventario, { foreignKey: "proveedorId" });

// Clientes
Optica.hasMany(Cliente, { foreignKey: "opticaId" });
Cliente.belongsTo(Optica, { foreignKey: "opticaId" });

// Fórmulas
Optica.hasMany(Formula, { foreignKey: "opticaId" });
Formula.belongsTo(Optica, { foreignKey: "opticaId" });

// Citas
Optica.hasMany(Cita, { foreignKey: "opticaId" });
Cita.belongsTo(Optica, { foreignKey: "opticaId" });

// Notas
Optica.hasMany(Notas, { foreignKey: "opticaId" });
Notas.belongsTo(Optica, { foreignKey: "opticaId" });

// Tratamientos de la fórmula
Optica.hasMany(TratamientosFormula, { foreignKey: "opticaId" });
TratamientosFormula.belongsTo(Optica, { foreignKey: "opticaId" });

// Condiciones de la fórmula
Optica.hasMany(CondicionesFormula, { foreignKey: "opticaId" });
CondicionesFormula.belongsTo(Optica, { foreignKey: "opticaId" });

// Pedidos
Optica.hasMany(Pedidos, { foreignKey: "opticaId" });
Pedidos.belongsTo(Optica, { foreignKey: "opticaId" });

// Ítems del pedido
Optica.hasMany(ItemsPedido, { foreignKey: "opticaId" });
ItemsPedido.belongsTo(Optica, { foreignKey: "opticaId" });

// Entregas
Optica.hasMany(Entregas, { foreignKey: "opticaId" });
Entregas.belongsTo(Optica, { foreignKey: "opticaId" });

// Facturas
Optica.hasMany(Facturas, { foreignKey: "opticaId" });
Facturas.belongsTo(Optica, { foreignKey: "opticaId" });

// Inventario
Optica.hasMany(Inventario, { foreignKey: "opticaId" });
Inventario.belongsTo(Optica, { foreignKey: "opticaId" });

// Proveedores (si querés que cada óptica tenga sus propios proveedores)
Optica.hasMany(Proveedores, { foreignKey: "opticaId" });
Proveedores.belongsTo(Optica, { foreignKey: "opticaId" });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// EgresosFinanzas.belongsToMany(Condominio, {
//   through: "egresoCondominio",
// });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
