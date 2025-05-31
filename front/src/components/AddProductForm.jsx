import { useState } from "react";
import Swal from "sweetalert";
import { addProduct } from "../services/api";
import "./Formularios.css";

const AddProductForm = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    nombre_producto: "",
    cantidad_stock: "",
    precio_venta: "",
    fecha_vencimiento: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        ...form,
        cantidad_stock: parseInt(form.cantidad_stock),
        precio_venta: parseFloat(form.precio_venta),
      });

      onProductAdded();

      setForm({
        nombre_producto: "",
        cantidad_stock: "",
        precio_venta: "",
        fecha_vencimiento: "",
      });

      Swal(
        "✅ Producto agregado",
        "El producto fue agregado exitosamente.",
        "success"
      );
    } catch (err) {
      console.error("Error al agregar producto:", err);
      Swal(
        "Error",
        "No se pudo agregar el producto. Intenta nuevamente.",
        "error"
      );
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>📦 Agregar Producto al Inventario</h3>

      <label>
        Nombre del producto
        <input
          type="text"
          name="nombre_producto"
          placeholder="Ej: Manzana"
          value={form.nombre_producto}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Cantidad en stock
        <input
          type="number"
          name="cantidad_stock"
          placeholder="Ej: 30"
          value={form.cantidad_stock}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Precio de venta (por unidad)
        <input
          type="number"
          name="precio_venta"
          step="0.01"
          placeholder="Ej: 1.50"
          value={form.precio_venta}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Fecha de vencimiento (opcional)
        <input
          type="date"
          name="fecha_vencimiento"
          value={form.fecha_vencimiento}
          onChange={handleChange}
        />
      </label>

      <button type="submit">➕ Agregar</button>
    </form>
  );
};

export default AddProductForm;
