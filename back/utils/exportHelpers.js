function generateCSV(data, columns) {
  const delimiter = ";";

  const escapeValue = (value) => {
    const stringValue = value != null ? String(value) : "";
    const escaped = stringValue.replace(/"/g, '""'); // Escape comillas dobles
    return `"${escaped}"`; // Encerrar en comillas siempre
  };

  const header = columns.map(escapeValue).join(delimiter);
  const rows = data
    .map((row) => columns.map((col) => escapeValue(row[col])).join(delimiter))
    .join("\n");

  const bom = "\uFEFF";
  return bom + header + "\n" + rows;
}

module.exports = { generateCSV };
