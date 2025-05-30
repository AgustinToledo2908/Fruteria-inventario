const express = require("express");
const app = express();
const PORT = 3001;

const inventoryRoutes = require("./routes/inventory");

app.use(express.json());
app.use("/api/inventory", inventoryRoutes);
const reportRoutes = require("./routes/reports");
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
