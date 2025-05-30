const express = require("express");
const router = express.Router();

// Ejemplo de ruta para testear
router.get("/", (req, res) => {
  res.json({ message: "Inventario funcionando" });
});

module.exports = router;
