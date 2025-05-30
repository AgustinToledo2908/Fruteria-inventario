# Frutería - Sistema de Gestión

Este proyecto es una aplicación completa (frontend + backend) para gestionar el inventario, las ventas y los reportes de una frutería. Permite registrar productos, registrar ventas, controlar el stock y generar reportes detallados.

## 📁 Estructura del Proyecto

Exisoft
├── backend/
│ ├── controllers/
│ ├── data/
│ ├── routes/
│ ├── utils/
│ └── index.js
├── front/
│ ├── src/
│ ├── public/
│ └── vite.config.js
└── README.md

yaml
Copiar

---

## 🚀 Cómo Ejecutar el Proyecto

### 🔧 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

---

### 📦 Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/fruteria.git
cd fruteria
2. Backend
bash
Copiar
cd backend
npm install
npm start
El backend se ejecuta en http://localhost:3001.

3. Frontend
bash
Copiar
cd ../front
npm install
npm run dev
El frontend se ejecuta en http://localhost:5173.

🧩 Funcionalidades
✅ Inventario
Alta de productos con:

Nombre

Cantidad en stock

Precio por unidad

Fecha de vencimiento (opcional)

Modificación y eliminación de productos

Visualización de inventario en formato de tabla tipo hoja de cálculo

✅ Ventas
Registro de ventas con:

Nombre del cliente

Fecha de venta

Producto, cantidad y precio total

Actualización automática del inventario

Validación de stock disponible

✅ Reportes
Ventas por día, semana o mes

Productos más vendidos

Productos con bajo stock

Ingresos totales

Exportación de reportes a CSV

🛠️ Tecnologías Utilizadas
Frontend: React, Vite, CSS Grid, Flexbox

Backend: Node.js, Express

Persistencia: Archivos JSON (inventory.json, sales.json)

Exportación: CSV y PDF (opcional)

📄 API RESTful
Inventario
GET /api/inventory

POST /api/inventory

PUT /api/inventory/:nombre_producto

DELETE /api/inventory/:nombre_producto

Ventas
POST /api/inventory/sales

Reportes
GET /api/reports/sales-summary?period=day|week|month

GET /api/reports/top-products?top=5

GET /api/reports/low-stock?threshold=5

GET /api/reports/total-income

GET /api/reports/export-top-products?format=csv|pdf

🤓 Autor
Agustín Toledo
Full Stack 
📧 agustintoledo2908@gmail.com
