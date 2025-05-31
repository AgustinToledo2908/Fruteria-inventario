# 🍎 Frutería Inventario

Sistema completo de gestión de inventario y ventas para una frutería. Permite ingresar productos, registrar ventas, controlar el stock y generar reportes detallados en formatos CSV.

---

## 📦 Tecnologías Utilizadas

### 🧠 Backend
- Node.js
- Express
- File System (`fs`) para persistencia en archivos `.json`
- Middleware personalizado


### 💻 Frontend
- React
- Vite
- React Router DOM
- Axios para peticiones HTTP
- Css

---

## 📁 Estructura del Proyecto

Fruteria-inventario/
├── back/ # Backend (API REST)
│ ├── controllers/ # Lógica de productos, ventas y reportes
│ ├── data/ # Archivos JSON de productos y ventas
│ ├── routes/ # Endpoints para interactuar con el sistema
│ ├── utils/ # Helpers para lectura, escritura y reportes
│ ├── tests/ # Pruebas unitarias con Jest
│ └── index.js # Punto de entrada del servidor
│
├── front/ # Frontend (React)
│ ├── src/
│ │ ├── components/ # Componentes reutilizables
│ │ ├── pages/ # Páginas principales: Agregar, Ventas, Reportes
│ │ ├── services/ # Peticiones HTTP usando Axios
│ │ ├── App.jsx # Definición de rutas
│ │ └── main.jsx # Punto de entrada
│ └── vite.config.js
│
└── README.md

yaml
Copiar
Editar

---

## ⚙️ Instalación y Ejecución

### 🔁 Clonar el Repositorio

```bash
git clone https://github.com/AgustinToledo2908/Fruteria-inventario.git
cd Fruteria-inventario
🚀 Ejecutar el Backend
bash
Copiar
Editar
cd back
npm install
npm start
El backend se ejecuta en: http://localhost:3001

💻 Ejecutar el Frontend
bash
Copiar
Editar
cd front
npm install
npm run dev
El frontend se ejecuta en: http://localhost:5173

🌐 Rutas del Frontend
Ruta	Funcionalidad
/	Visualización del inventario actual
/agregar	Formulario para agregar nuevos productos
/ventas	Registro de ventas y actualización de stock
/reportes	Visualización de reportes de ventas e ingresos

📌 Funcionalidades
Inventario
Registro de productos con nombre, cantidad, precio y vencimiento opcional

Persistencia en productos.json

Control de stock actualizado dinámicamente

Ventas
Registro de ventas con cliente, productos, cantidad y precio total

Descuento automático del stock



Reportes

Productos más vendidos

Productos con bajo stock

Exportación desde backend en formatos CSV 

✅ Estado del Proyecto
 Backend funcional con todas las rutas

 Frontend operativo con navegación por rutas

 Persistencia en archivos .json

 Validaciones de stock

 Pruebas unitarias con Jest

🧑‍💻 Autor
Agustín Toledo
Full Stack Developer
📧 agustintoledo2908@gmail.com

 
