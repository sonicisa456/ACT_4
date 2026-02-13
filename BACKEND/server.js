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
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://https://act-4-eta.vercel.app/"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
