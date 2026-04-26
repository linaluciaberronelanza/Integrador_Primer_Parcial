# 🍔 MOLDFRY - Tienda Enmohecida

**Primer Parcial - Programación 3**
* **Alumna:** Lina Lucía Berrone Lanza
* **Año:** 2026

## 📝 Descripción del Proyecto
MOLDFRY es una aplicación web e-commerce desarrollada para el primer parcial de Programación 3. Simula una tienda de comida con estética "tóxica/enmohecida". El proyecto demuestra el dominio de la manipulación del DOM, tipado estricto, modularización de ES6 y persistencia de datos en el cliente.

## 🛠️ Tecnologías y Herramientas Utilizadas
* **Lenguaje:** TypeScript / JavaScript (ES6+).
* **Estructura y Estilos:** HTML5, CSS3 (Flexbox/Grid, variables CSS, estricta separación de responsabilidades, sin estilos en línea).
* **Bundler:** Vite.
* **Almacenamiento:** LocalStorage (Persistencia del carrito).

## ✅ Correcciones de TPs Anteriores Aplicadas
* **Filtrado dinámico:** Se implementó el filtrado de productos por categorías desde el aside, interactuando con el buscador.
* **Prevención de recarga:** Se agregó `event.preventDefault()` en el formulario de búsqueda.
* **Modularización:** Separación estricta en módulos de ES6 (`import`/`export`) dividiendo lógicas de datos, interfaces, utilidades y vistas.

## 🚀 Funcionalidades del Parcial (User Stories)
1. **Catálogo Dinámico:** Renderizado de productos desde una fuente de datos estructurada.
2. **Carrito de Compras:** - Agregar productos con feedback visual asíncrono en el botón.
   - Panel de visualización de compras con cálculo automático de subtotales y total general.
   - Funcionalidad de sumar/restar unidades y eliminación automática al llegar a cero.
   - Persistencia de datos en el LocalStorage.

## 💻 Instrucciones de Ejecución
1. Clonar el repositorio.
2. Instalar dependencias: `pnpm install`
3. Levantar el servidor: `pnpm run dev`