const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

const inventoryRoutes = require("./routes/inventory");
const reportRoutes = require("./routes/reports");

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
