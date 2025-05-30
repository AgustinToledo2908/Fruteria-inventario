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
const salesFile = path.join(__dirname, "../data/sales.json");

function readSales() {
  try {
    const data = fs.readFileSync(salesFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeSales(sales) {
  fs.writeFileSync(salesFile, JSON.stringify(sales, null, 2));
}

function registerSale(req, res) {
  const { nombre_cliente, fecha_venta, detalles } = req.body;

  if (!nombre_cliente || !fecha_venta || !Array.isArray(detalles)) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios o formato incorrecto" });
  }

  try {
    let inventory = readInventory();
    let sales = readSales();

    for (const item of detalles) {
      const product = inventory.find(
        (p) =>
          p.nombre_producto.toLowerCase() === item.nombre_producto.toLowerCase()
      );
      if (!product) {
        return res
          .status(400)
          .json({ error: `Producto ${item.nombre_producto} no existe` });
      }
      if (item.cantidad_vendida > product.cantidad_stock) {
        return res
          .status(400)
          .json({ error: `Stock insuficiente para ${item.nombre_producto}` });
      }
    }

    for (const item of detalles) {
      const product = inventory.find(
        (p) =>
          p.nombre_producto.toLowerCase() === item.nombre_producto.toLowerCase()
      );
      product.cantidad_stock -= item.cantidad_vendida;
    }

    writeInventory(inventory);

    const newSale = { nombre_cliente, fecha_venta, detalles };
    sales.push(newSale);
    writeSales(sales);

    res
      .status(201)
      .json({ message: "Venta registrada correctamente", sale: newSale });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { addProduct, deleteProduct, registerSale };
