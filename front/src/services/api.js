import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const getInventory = () => axios.get(`${API_URL}/inventory`);
export const addProduct = (product) =>
  axios.post(`${API_URL}/inventory`, product);
export const updateProduct = (name, product) =>
  axios.put(`${API_URL}/inventory/${name}`, product);
export const deleteProduct = (name) =>
  axios.delete(`${API_URL}/inventory/${name}`);

export const registerSale = (saleData) =>
  axios.post(`${API_URL}/inventory/sales`, saleData);

export const getSalesSummary = (period = "day") =>
  axios.get(`${API_URL}/reports/sales-summary?period=${period}`);
export const getTopProducts = (top = 5) =>
  axios.get(`${API_URL}/reports/top-products?top=${top}`);
export const getLowStock = (threshold = 5) =>
  axios.get(`${API_URL}/reports/low-stock?threshold=${threshold}`);
export const getTotalIncome = () =>
  axios.get(`${API_URL}/reports/total-income`);
export const exportTopProducts = (format = "csv") =>
  axios.get(`${API_URL}/reports/export-top-products?format=${format}`, {
    responseType: "blob",
  });
export const exportLowStock = () =>
  axios.get(`${API_URL}/reports/export-low-stock`, { responseType: "blob" });
