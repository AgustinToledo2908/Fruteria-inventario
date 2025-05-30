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

module.exports = { addProduct };
