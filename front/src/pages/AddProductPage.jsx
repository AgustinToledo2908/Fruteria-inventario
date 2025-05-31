import AddProductForm from "../components/AddProductForm";

const AddProductPage = () => {
  return (
    <div className="inventory-container">
      <h2>Agregar nuevo producto</h2>
      <AddProductForm onProductAdded={() => {}} />
    </div>
  );
};

export default AddProductPage;
