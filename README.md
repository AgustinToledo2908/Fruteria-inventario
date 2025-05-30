🍎 Frutería - Sistema de Gestión
Este proyecto es una aplicación completa (frontend + backend) para gestionar el inventario, las ventas y los reportes de una frutería. Permite registrar productos, registrar ventas, controlar el stock y generar reportes detallados en CSV y PDF.

📁 Estructura del Proyecto

Fruteria-inventario/
├── backend/
│   ├── controllers/
│   ├── data/
│   │   ├── inventory.json
│   │   └── sales.json
│   ├── routes/
│   ├── utils/
│   │   └── exportHelpers.js
│   ├── index.js
│   └── tests/
│       ├── inventoryController.test.js
│       └── reportController.test.js
├── front/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
└── README.md
🚀 Cómo Ejecutar el Proyecto
🔧 Requisitos Previos
Node.js (v18 o superior)

npm o yarn

📦 Instalación
1. Clonar el repositorio
bash
Copiar
git clone https://github.com/AgustinToledo2908/Fruteria-inventario.git
cd Fruteria-inventario
2. Iniciar el Backend
bash
Copiar
cd backend
npm install
npm start
El backend se ejecuta en http://localhost:3001.

3. Iniciar el Frontend
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

Visualización del inventario en tabla estilo hoja de cálculo

✅ Ventas
Registro de ventas con:

Nombre del cliente

Fecha de venta

Producto, cantidad y precio total

Actualización automática del stock

Validación de disponibilidad en inventario

✅ Reportes
Ventas por día, semana o mes

Productos más vendidos

Productos con bajo stock

Ingresos totales

Exportación de reportes a formato CSV

🛠️ Tecnologías Utilizadas
Frontend: React + Vite, CSS (Grid, Flexbox)

Backend: Node.js, Express

Persistencia: Archivos JSON (inventory.json, sales.json)

Exportación: CSV y PDF

Test: Jest + Supertest

📄 API RESTful
📦 Inventario
GET /api/inventory — Obtener todos los productos

POST /api/inventory — Agregar un nuevo producto

PUT /api/inventory/:nombre_producto — Editar producto

DELETE /api/inventory/:nombre_producto — Eliminar producto

💰 Ventas
POST /api/inventory/sales — Registrar una venta

📊 Reportes
GET /api/reports/sales-summary?period=day|week|month

GET /api/reports/top-products?top=5

GET /api/reports/low-stock?threshold=5

GET /api/reports/total-income

GET /api/reports/export-top-products?format=csv|pdf

🎯 Pruebas
El backend cuenta con pruebas unitarias para los controladores de inventario y reportes.

bash
Copiar
cd backend
npm test 
👨‍💻 Autor
Agustín Toledo
Full Stack Developer
📧 agustintoledo2908@gmail.com

 
