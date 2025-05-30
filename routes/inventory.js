const fs = require("fs");
const path = require("path");

const inventoryPath = path.join(__dirname, "../data/inventory.json");

const express = require("express");
const router = express.Router();

const {
  addProduct,
  deleteProduct,
  registerSale,
} = require("../controllers/inventoryController");

router.get("/", (req, res) => {
  res.json({ message: "Inventario funcionando" });
});

router.post("/", addProduct);
router.put("/:name", (req, res) => {
  const productName = req.params.name.toLowerCase();
  const { cantidad_stock, precio_venta, fecha_vencimiento } = req.body;

  try {
    let inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));

    const index = inventory.findIndex(
      (item) => item.nombre_producto.toLowerCase() === productName
    );

    if (index === -1) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    if (cantidad_stock !== undefined) {
      inventory[index].cantidad_stock = cantidad_stock;
    }
    if (precio_venta !== undefined) {
      inventory[index].precio_venta = precio_venta;
    }
    if (fecha_vencimiento !== undefined) {
      inventory[index].fecha_vencimiento = fecha_vencimiento;
    }

    fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2));
    res.json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});
router.delete("/:name", deleteProduct);
router.post("/sales", registerSale);

module.exports = router;
