import { useEffect, useState } from "react";
import Swal from "sweetalert";
import { getInventory, deleteProduct, updateProduct } from "../services/api";
import "./InventoryPage.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const loadInventory = () => {
    getInventory()
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Error al cargar inventario", err));
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleDelete = async (nombre_producto) => {
    const confirmar = await Swal({
      title: "¿Estás seguro?",
      text: `Vas a eliminar "${nombre_producto}" del inventario.`,
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    });

    if (!confirmar) return;

    try {
      await deleteProduct(nombre_producto);
      Swal("Eliminado", "El producto fue eliminado correctamente", "success");
      loadInventory();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      Swal("Error", "No se pudo eliminar el producto", "error");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...inventory[index] });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const nombreOriginal = inventory[editIndex].nombre_producto;
      await updateProduct(nombreOriginal, {
        ...editData,
        cantidad_stock: Number(editData.cantidad_stock),
        precio_venta: Number(editData.precio_venta),
      });
      setEditIndex(null);
      Swal("Actualizado", "Producto modificado correctamente", "success");
      loadInventory();
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      Swal("Error", "No se pudo actualizar el producto", "error");
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="inventory-container">
      <h1>Inventario Actual</h1>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha de Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, idx) => (
            <tr key={idx}>
              {editIndex === idx ? (
                <>
                  <td>
                    <input
                      name="nombre_producto"
                      value={editData.nombre_producto}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="cantidad_stock"
                      type="number"
                      value={editData.cantidad_stock}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="precio_venta"
                      type="number"
                      step="0.01"
                      value={editData.precio_venta}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="fecha_vencimiento"
                      type="date"
                      value={editData.fecha_vencimiento || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button className="save-button" onClick={handleSave}>
                      Guardar
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.nombre_producto}</td>
                  <td>{item.cantidad_stock}</td>
                  <td>${item.precio_venta.toFixed(2)}</td>
                  <td>{item.fecha_vencimiento || "Sin fecha"}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(idx)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.nombre_producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
