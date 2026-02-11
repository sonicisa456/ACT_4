const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));


app.get("/", (req, res) => {
  res.send("API ACT_4 funcionando");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Servidor corriendo en puerto", PORT));
