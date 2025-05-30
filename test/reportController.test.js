const {
  salesSummary,
  topSellingProducts,
  lowStockProducts,
  totalIncome,
} = require("../controllers/reportController");

jest.mock("fs", () => ({
  readFileSync: (filePath) => {
    if (filePath.includes("sales.json")) {
      return JSON.stringify([
        {
          fecha_venta: "2024-05-30",
          detalles: [
            {
              nombre_producto: "Manzana",
              cantidad_vendida: 2,
              precio_total: 3.0,
            },
            {
              nombre_producto: "Banana",
              cantidad_vendida: 1,
              precio_total: 1.2,
            },
          ],
        },
      ]);
    } else if (filePath.includes("inventory.json")) {
      return JSON.stringify([
        {
          nombre_producto: "Manzana",
          cantidad_stock: 3,
        },
        {
          nombre_producto: "Pera",
          cantidad_stock: 2,
        },
      ]);
    }
    return "[]";
  },
}));

describe("reportController", () => {
  test("salesSummary retorna resumen diario", () => {
    const result = salesSummary("day");
    expect(result).toHaveProperty("2024-05-30");
    expect(result["2024-05-30"].totalVentas).toBe(3);
    expect(result["2024-05-30"].totalIngreso).toBeCloseTo(4.2);
  });

  test("topSellingProducts retorna productos más vendidos", () => {
    const result = topSellingProducts(2);
    expect(result.length).toBeLessThanOrEqual(2);
    expect(result[0]).toHaveProperty("nombre_producto");
    expect(result[0]).toHaveProperty("cantidad");
  });

  test("lowStockProducts retorna productos con stock bajo", () => {
    const result = lowStockProducts(3);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("cantidad_stock");
  });

  test("totalIncome retorna la suma total de ingresos", () => {
    const result = totalIncome();
    expect(result).toBeCloseTo(4.2);
  });
});
