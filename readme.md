# 🍔 MOLDFRY - Tienda Enmohecida

**Primer Parcial - Programación 3**
* **Alumna:** Lina Lucía Berrone Lanza
* **Año:** 2026

## 📝 Descripción del Proyecto
MOLDFRY es una aplicación web e-commerce desarrollada para el primer parcial de Programación 3. Simula una tienda de comida con estética "tóxica/enmohecida". El proyecto demuestra el dominio de la manipulación del DOM, tipado estricto, modularización de ES6 y persistencia de datos dinámica en el cliente.

## 🛠️ Tecnologías y Herramientas Utilizadas
* **Lenguaje:** TypeScript / JavaScript (ES6+).
* **Estructura y Estilos:** HTML5, CSS3 (Flexbox/Grid, variables CSS, estricta separación de responsabilidades, cero estilos en línea).
* **Bundler:** Vite.
* **Almacenamiento:** LocalStorage (Persistencia dinámica de carrito y sesión vinculada a `userData`).

## ✅ Correcciones de TPs Anteriores Aplicadas
* **Filtrado dinámico:** Se implementó el filtrado de productos por categorías desde el aside, interactuando simultáneamente con el buscador.
* **Prevención de recarga:** Se agregó `event.preventDefault()` en el formulario de búsqueda y en los filtros.
* **Modularización:** Separación estricta en módulos de ES6 (`import`/`export`) dividiendo lógicas de datos, interfaces, utilidades y vistas.

## 🚀 Funcionalidades del Parcial
1. **Catálogo Dinámico:** Renderizado de productos desde una fuente de datos estructurada.
2. **Carrito de Compras Independiente:** - Agregar productos con feedback visual aislado (timers independientes para evitar bugs de clicks rápidos).
   - Panel de compras con cálculo automático de subtotales y total.
   - Generación de llaves dinámicas en LocalStorage atadas a la sesión del usuario para asegurar que cada cliente tenga un carrito aislado.
3. **Autenticación (Extra):** Sistema de Registro, Login y Logout con validación de roles y limpieza segura de sesión.

## 💻 Instrucciones de Ejecución

Clonar el repositorio y abrir una terminal en la raíz del proyecto. Para instalar las dependencias previas, ejecuta: 
`pnpm install`

**Opción A: Entorno de Desarrollo (Recomendado para revisión de código)**
Para levantar el servidor local con Hot Module Replacement, ejecuta el siguiente comando:
`pnpm run dev`

**Opción B: Entorno de Producción (Para evaluar el empaquetado final)**
Para generar la carpeta final validando la configuración, primero compila el proyecto con `pnpm build`. Una vez finalizado, puedes previsualizar el resultado exacto ejecutando `pnpm preview`.