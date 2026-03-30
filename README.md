# Mobile Gadget Store SPA

Esta es una mini-aplicación de compra de dispositivos móviles desarrollada con **React** y **Vite**. La aplicación permite navegar por un catálogo de productos, filtrar resultados en tiempo real y ver detalles técnicos específicos de cada dispositivo, así como añadirlos a una cesta persistente.

## 🚀 Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

## 🛠️ Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto localmente:

1. **Clona el repositorio** (o accede a la carpeta del proyecto).
2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run start
   ```
   La aplicación estará disponible en `http://localhost:5173/`.

## 📦 Scripts Disponibles

El proyecto incluye los siguientes scripts requeridos para su gestión:

- `npm run start`: Inicia el entorno de desarrollo con Vite.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
- `npm run test`: Ejecuta la suite de pruebas unitarias con Vitest.
- `npm run lint`: Ejecuta el análisis estático de código con ESLint para asegurar la calidad.

## 📐 Arquitectura y Tecnologías

- **React 19**: Framework principal para la UI.
- **React Router 7**: Gestión de navegación SPA sin recargas de página.
- **Context API**: Manejo del estado global del carrito de compra.
- **Vanilla CSS**: Sistema de diseño moderno con Glassmorphism y layouts responsivos (CSS Grid/Flexbox).
- **LocalStorage**: Persistencia de datos local para el contador del carrito.
- **Vite**: Herramienta de construcción ultra-rápida.

## 📝 Notas Adicionales

- **Caché de Cliente**: Implementación de un sistema de persistencia en `localStorage` que almacena las respuestas del API (PLP y PDP) con una **expiración de 1 hora**, optimizando el rendimiento y cumpliendo los requisitos técnicos.
- **Mock & Real API**: El servicio `src/services/api.js` está configurado para consumir los endpoints reales situados en `itx-frontend-test.onrender.com`.
- **Diseño**: Se ha priorizado una estética "Tech/Premium" con efectos de desenfoque, sombras suaves y tipografía moderna (Inter).
- **Responsividad**: La interfaz se adapta automáticamente a diferentes tamaños de pantalla (móvil, tablet y desktop), cumpliendo con el requisito de hasta 4 elementos por fila en resoluciones altas.
