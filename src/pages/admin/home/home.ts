import { checkAuhtUser, logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/Product";
import type { ICategory } from "../../../types/Category";

// 1. Seguridad: Verificar cliente
checkAuhtUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");

// Botón de cerrar sesión
document.getElementById("logoutButton")?.addEventListener("click", logout);

// 2. Elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const listaCategorias = document.getElementById("lista-categorias");
const buscador = document.getElementById("buscador") as HTMLInputElement;

// 3. Renderizar Categorías en la barra lateral
const renderizarCategorias = () => {
    if (!listaCategorias) return;

    // Empezamos con la opción "Todas"
    listaCategorias.innerHTML = `
        <li style="margin-bottom: 10px;">
            <a href="#" class="cat-filter" data-id="todas" style="color: var(--verde-fluor); font-weight: bold;">[ Todas las Delicias ]</a>
        </li>
    `;

    const categorias: ICategory[] = getCategories();
    // Agregamos el tipo explícito (cat: ICategory)
    categorias.forEach((cat: ICategory) => {
        listaCategorias.innerHTML += `
            <li style="margin-bottom: 10px;">
                <a href="#" class="cat-filter" data-id="${cat.id}" style="color: var(--blanco-texto); text-decoration: none;">${cat.nombre}</a>
            </li>
        `;
    });

    // Escuchar los clics en las categorías
    const botonesCategorias = document.querySelectorAll(".cat-filter");
    botonesCategorias.forEach((boton: Element) => {
        boton.addEventListener("click", (e: Event) => {
            e.preventDefault();

            // Pintar de blanco los que no están seleccionados y de verde el clickeado
            botonesCategorias.forEach((b: Element) => (b as HTMLElement).style.color = "var(--blanco-texto)");
            const target = e.target as HTMLElement;
            target.style.color = "var(--verde-fluor)";
            target.style.fontWeight = "bold";

            // Filtrar
            const catId = target.getAttribute("data-id");
            filtrarProductos(catId, buscador.value);
        });
    });
};

// 4. Renderizar las Tarjetas de Productos
const renderizarProductos = (productosAMostrar: Product[]) => {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";

    if (productosAMostrar.length === 0) {
        contenedorProductos.innerHTML = "<h3 style='color: var(--gris-texto);'>No se encontraron delicias rancias con esos criterios...</h3>";
        return;
    }

    // Agregamos el tipo explícito (producto: Product)
    productosAMostrar.forEach((producto: Product) => {
        if (producto.disponible && !producto.eliminado) {
            const article = document.createElement("article");
            article.className = "producto-card";

            article.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                <h3>${producto.nombre}</h3>
                <p class="desc">${producto.descripcion}</p>
                <p class="precio">Precio: <strong>$${producto.precio}</strong></p>
                <button class="btn-agregar" data-id="${producto.id}">AGREGAR AL CARRITO</button>
            `;
            contenedorProductos.appendChild(article);
        }
    });
};

// 5. El Cerebro: Función combinada de filtrado y búsqueda
const filtrarProductos = (catId: string | null, terminoBusqueda: string) => {
    let filtrados: Product[] = PRODUCTS;

    // A. Filtrar por categoría
    if (catId && catId !== "todas") {
        // Tipamos 'p' como Product y 'c' como ICategory
        filtrados = filtrados.filter((p: Product) => p.categorias.some((c: ICategory) => c.id.toString() === catId));
    }

    // B. Filtrar por texto
    if (terminoBusqueda) {
        const termino = terminoBusqueda.toLowerCase();
        // Tipamos 'p' como Product
        filtrados = filtrados.filter((p: Product) =>
            p.nombre.toLowerCase().includes(termino) ||
            p.descripcion.toLowerCase().includes(termino)
        );
    }

    renderizarProductos(filtrados);
};

// 6. Escuchar cuando el usuario escribe en el buscador
buscador?.addEventListener("input", (e: Event) => {
    const categoriaActiva = document.querySelector(".cat-filter[style*='var(--verde-fluor)']");
    const catId = categoriaActiva ? categoriaActiva.getAttribute("data-id") : "todas";

    filtrarProductos(catId, (e.target as HTMLInputElement).value);
});

// 7. Arrancar la página
renderizarCategorias();
renderizarProductos(PRODUCTS);