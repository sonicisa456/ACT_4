const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Conectar a Mongo solo si NO estamos en tests
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("API ACT_4 funcionando");
});

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// Puerto
const PORT = process.env.PORT || 4000;

// Solo levantar servidor si no está siendo requerido por Jest o Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
  });
}

// Exportar app para pruebas y Vercel
module.exports = app;
