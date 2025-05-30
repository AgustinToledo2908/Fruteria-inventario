function generateCSV(data, columns) {
  const header = columns.join(",") + "\n";
  const rows = data
    .map((row) => columns.map((col) => `"${row[col]}"`).join(","))
    .join("\n");

  return header + rows;
}
const PDFDocument = require("pdfkit");

function generatePDF(data, columns, res) {
  const doc = new PDFDocument({ margin: 30, size: "A4" });

  doc.pipe(res);

  doc.fontSize(18).text("Reporte de productos", { align: "center" });
  doc.moveDown();

  columns.forEach((col, i) => {
    doc.fontSize(12).text(col, { continued: i !== columns.length - 1 });
  });
  doc.moveDown();

  data.forEach((row) => {
    columns.forEach((col, i) => {
      const text = row[col] !== undefined ? row[col].toString() : "";
      doc.fontSize(10).text(text, { continued: i !== columns.length - 1 });
    });
    doc.moveDown();
  });

  doc.end();
}

module.exports = { generateCSV, generatePDF };
