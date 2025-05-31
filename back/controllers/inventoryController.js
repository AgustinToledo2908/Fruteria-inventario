const path = require("path");
const { readFile, writeFile } = require("../utils/fileUtils");

const inventoryFile = path.join(__dirname, "../data/inventory.json");
const salesFile = path.join(__dirname, "../data/sales.json");

function addProduct(req, res) {
  const { nombre_producto, cantidad_stock, precio_venta, fecha_vencimiento } =
    req.body;

  if (!nombre_producto || !cantidad_stock || !precio_venta) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const inventory = readFile(inventoryFile);

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
  writeFile(inventoryFile, inventory);

  res
    .status(201)
    .json({ message: "Producto agregado correctamente", product: newProduct });
}

function deleteProduct(req, res) {
  const productName = req.params.name.toLowerCase();

  try {
    let inventory = readFile(inventoryFile);

    const index = inventory.findIndex(
      (item) => item.nombre_producto.toLowerCase() === productName
    );

    if (index === -1) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    inventory.splice(index, 1);
    writeFile(inventoryFile, inventory);

    res.json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

function registerSale(req, res) {
  const { nombre_cliente, fecha_venta, detalles } = req.body;

  if (!nombre_cliente || !fecha_venta || !Array.isArray(detalles)) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios o formato incorrecto" });
  }

  try {
    let inventory = readFile(inventoryFile);
    let sales = readFile(salesFile);

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

    writeFile(inventoryFile, inventory);

    const newSale = { nombre_cliente, fecha_venta, detalles };
    sales.push(newSale);
    writeFile(salesFile, sales);

    res
      .status(201)
      .json({ message: "Venta registrada correctamente", sale: newSale });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { addProduct, deleteProduct, registerSale };
