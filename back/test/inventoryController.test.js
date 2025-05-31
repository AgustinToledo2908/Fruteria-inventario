const fs = require("fs");
const path = require("path");
const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

const {
  addProduct,
  deleteProduct,
  registerSale,
} = require("../controllers/inventoryController");
const { readFile, writeFile } = require("../controllers/fileUtils");

const inventoryTestFile = path.join(__dirname, "../data/inventory.test.json");
const salesTestFile = path.join(__dirname, "../data/sales.test.json");

jest.mock("../controllers/fileUtils", () => {
  const actualFs = jest.requireActual("fs");
  return {
    readFile: jest.fn((filePath) => {
      const content = actualFs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }),
    writeFile: jest.fn((filePath, data) => {
      actualFs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }),
  };
});

app.post("/api/inventory", (req, res) => addProduct(req, res));
app.delete("/api/inventory/:name", (req, res) => deleteProduct(req, res));
app.post("/api/inventory/sales", (req, res) => registerSale(req, res));

beforeEach(() => {
  fs.copyFileSync(
    path.join(__dirname, "../data/inventory.json"),
    inventoryTestFile
  );
  fs.copyFileSync(path.join(__dirname, "../data/sales.json"), salesTestFile);
});

afterEach(() => {
  if (fs.existsSync(inventoryTestFile)) fs.unlinkSync(inventoryTestFile);
  if (fs.existsSync(salesTestFile)) fs.unlinkSync(salesTestFile);
});

describe("Controlador de Inventario", () => {
  test("Agregar producto válido", async () => {
    const res = await request(app).post("/api/inventory").send({
      nombre_producto: "Kiwi",
      cantidad_stock: 10,
      precio_venta: 2.5,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Producto agregado correctamente");
  });

  test("Eliminar producto existente", async () => {
    await request(app).post("/api/inventory").send({
      nombre_producto: "TestBorrar",
      cantidad_stock: 5,
      precio_venta: 1,
    });

    const res = await request(app).delete("/api/inventory/TestBorrar");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Producto eliminado correctamente.");
  });

  test("Registrar venta válida", async () => {
    await request(app).post("/api/inventory").send({
      nombre_producto: "TestVenta",
      cantidad_stock: 20,
      precio_venta: 1.5,
    });

    const res = await request(app)
      .post("/api/inventory/sales")
      .send({
        nombre_cliente: "Cliente Test",
        fecha_venta: "2024-05-01",
        detalles: [
          {
            nombre_producto: "TestVenta",
            cantidad_vendida: 5,
            precio_total: 7.5,
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Venta registrada correctamente");
  });
});
