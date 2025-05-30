const express = require("express");
const router = express.Router();

const { addProduct } = require("../controllers/inventoryController");

router.get("/", (req, res) => {
  res.json({ message: "Inventario funcionando" });
});

router.post("/", addProduct);

module.exports = router;
