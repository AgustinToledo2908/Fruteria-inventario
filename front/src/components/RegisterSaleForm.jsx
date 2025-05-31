import { useState, useEffect } from "react";
import Swal from "sweetalert";
import { getInventory, registerSale } from "../services/api";
import "./Formularios.css";

const RegisterSaleForm = ({ onSaleRegistered }) => {
  const [inventory, setInventory] = useState([]);
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getInventory()
      .then((res) => setInventory(res.data))
      .catch(() => Swal("Error", "No se pudo cargar el inventario", "error"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cliente || !fecha || !productoSeleccionado || !cantidad) {
      return Swal(
        "Campos obligatorios",
        "Completa todos los campos.",
        "warning"
      );
    }

    const producto = inventory.find(
      (p) => p.nombre_producto === productoSeleccionado
    );
    if (!producto) {
      return Swal("Error", "Producto no válido", "error");
    }

    const cantidadInt = parseInt(cantidad);
    if (cantidadInt > producto.cantidad_stock) {
      return Swal(
        "Stock insuficiente",
        "No hay suficiente stock disponible",
        "warning"
      );
    }

    const venta = {
      nombre_cliente: cliente,
      fecha_venta: fecha,
      detalles: [
        {
          nombre_producto: productoSeleccionado,
          cantidad_vendida: cantidadInt,
          precio_total: cantidadInt * producto.precio_venta,
        },
      ],
    };

    try {
      await registerSale(venta);
      setCliente("");
      setFecha("");
      setProductoSeleccionado("");
      setCantidad("");
      setError("");
      onSaleRegistered();
      Swal(
        "¡Venta registrada!",
        "La venta se ha registrado correctamente",
        "success"
      );
    } catch (err) {
      console.error(err);
      Swal("Error", "Ocurrió un error al registrar la venta", "error");
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>🧾 Registrar Venta</h3>

      <label>
        Nombre del cliente
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />
      </label>

      <label>
        Fecha de la venta
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </label>

      <label>
        Producto
        <select
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
          required
        >
          <option value="">Seleccionar producto</option>
          {inventory.map((prod, i) => (
            <option key={i} value={prod.nombre_producto}>
              {prod.nombre_producto} (Stock: {prod.cantidad_stock})
            </option>
          ))}
        </select>
      </label>

      <label>
        Cantidad a vender
        <input
          type="number"
          placeholder="Ej: 5"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1"
          required
        />
      </label>

      <button type="submit">💸 Registrar Venta</button>
    </form>
  );
};

export default RegisterSaleForm;
