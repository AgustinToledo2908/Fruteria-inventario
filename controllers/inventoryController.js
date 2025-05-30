const fs = require("fs");
const path = require("path");

const inventoryFile = path.join(__dirname, "../data/inventory.json");

function readInventory() {
  try {
    const data = fs.readFileSync(inventoryFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeInventory(inventory) {
  fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
}

function addProduct(req, res) {
  const { nombre_producto, cantidad_stock, precio_venta, fecha_vencimiento } =
    req.body;

  if (!nombre_producto || !cantidad_stock || !precio_venta) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const inventory = readInventory();

  const existingProduct = inventory.find(
    (item) =>
      item.nombre_producto.toLowerCase() === nombre_producto.toLowerCase()
  );
  if (existingProduct) {
    return res
      .status(400)
      .json({ error: "El producto ya existe en el inventario" });
  }

  const newProduct = {
    nombre_producto,
    cantidad_stock,
    precio_venta,
    fecha_vencimiento: fecha_vencimiento || null,
  };

  inventory.push(newProduct);
  writeInventory(inventory);

  res
    .status(201)
    .json({ message: "Producto agregado correctamente", product: newProduct });
}
const deleteProduct = (req, res) => {
  const productName = req.params.name.toLowerCase();

  try {
    let inventory = JSON.parse(fs.readFileSync(inventoryFile, "utf-8"));

    const index = inventory.findIndex(
      (item) => item.nombre_producto.toLowerCase() === productName
    );

    if (index === -1) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    inventory.splice(index, 1);

    fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
    res.json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = { addProduct, deleteProduct };
