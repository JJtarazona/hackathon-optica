// require("dotenv").config();
// const app = require("./src/app.js");
// const { conn } = require("./src/db.js");

// const PORT = process.env.PORT || 3001;

// conn
//   .sync({
//     force: false,
//     alter: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`🚀 Server corriendo en el puerto ${PORT}`);
//     });
//   });

// index.js
require("dotenv").config();
const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Clerk } = require("@clerk/clerk-sdk-node");
const checkAuth = require("./src/middlewares/checkAuth"); // Asegúrate de tener el middleware

const PORT = process.env.PORT || 3001;

// Configurar Clerk
Clerk({ apiKey: process.env.CLERK_API_KEY }); // Asegúrate de tener CLERK_API_KEY en tu archivo .env

// Rutas de la API
const routes = require("./src/routes"); // Rutas generales

// Usar el middleware de Clerk en rutas protegidas
app.use("/api/protected", checkAuth); // Aquí protegerás todas las rutas bajo /api/protected

// Usar todas las rutas definidas
app.use("/api", routes);

conn
  .sync({
    force: false,
    alter: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server corriendo en el puerto ${PORT}`);
    });
  });
