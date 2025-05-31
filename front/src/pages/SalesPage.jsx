import RegisterSaleForm from "../components/RegisterSaleForm";

const SalesPage = () => {
  return (
    <div className="inventory-container">
      <h2>Registrar una venta</h2>
      <RegisterSaleForm onSaleRegistered={() => {}} />
    </div>
  );
};

export default SalesPage;
