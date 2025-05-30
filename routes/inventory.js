const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Inventario funcionando" });
});

module.exports = router;
