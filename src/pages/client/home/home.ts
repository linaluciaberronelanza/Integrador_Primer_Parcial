import { checkAuhtUser, logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, getCartCount } from "../../../store/cart/cart";
import type { Product } from "../../../types/Product";
import type { ICategory } from "../../../types/Category";

// 1. Seguridad
checkAuhtUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");
document.getElementById("logoutButton")?.addEventListener("click", logout);

// 2. Elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const listaCategorias = document.getElementById("lista-categorias");
const buscador = document.getElementById("buscador") as HTMLInputElement;
const cartCountSpan = document.getElementById("cart-count");

const actualizarContadorCarrito = (): void => {
    if (cartCountSpan) {
        cartCountSpan.textContent = getCartCount().toString();
    }
};

// 3. Renderizar Categorías
const renderizarCategorias = (): void => {
    if (!listaCategorias) return;

    listaCategorias.innerHTML = `
        <li class="cat-item">
            <a href="#" class="cat-filter active" data-id="todas">[ Todas las Delicias ]</a>
        </li>
    `;

    const categorias: ICategory[] = getCategories();
    categorias.forEach((cat: ICategory) => {
        listaCategorias.innerHTML += `
            <li class="cat-item">
                <a href="#" class="cat-filter" data-id="${cat.id}">${cat.nombre}</a>
            </li>
        `;
    });

    const botonesCategorias = document.querySelectorAll(".cat-filter");
    botonesCategorias.forEach((boton: Element) => {
        boton.addEventListener("click", (e: Event) => {
            e.preventDefault();
            // Quitamos la clase 'active' a todos
            botonesCategorias.forEach((b: Element) => b.classList.remove("active"));

            // Le ponemos la clase 'active' al que clickeamos
            const target = e.target as HTMLElement;
            target.classList.add("active");

            filtrarProductos(target.getAttribute("data-id"), buscador.value);
        });
    });
};

// 4. Renderizar Productos
const renderizarProductos = (productosAMostrar: Product[]): void => {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";

    if (productosAMostrar.length === 0) {
        contenedorProductos.innerHTML = "<h3 style='color: var(--gris-texto);'>No se encontraron delicias rancias...</h3>";
        return;
    }

    productosAMostrar.forEach((producto: Product) => {
        if (producto.disponible && !producto.eliminado) {
            const article = document.createElement("article");
            article.className = "producto-card";
            article.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: <strong>$${producto.precio}</strong></p>
                <button class="btn-agregar" data-id="${producto.id}">AGREGAR AL CARRITO</button>
            `;
            contenedorProductos.appendChild(article);
        }
    });
};

// 5. Delegación de eventos para el carrito y BOTÓN AMARILLO (Sin colores inline)
contenedorProductos?.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("btn-agregar")) {
        const productId = Number(target.getAttribute("data-id"));
        const productoRancio = PRODUCTS.find((p: Product) => p.id === productId);

        if (productoRancio) {
            addToCart(productoRancio);
            actualizarContadorCarrito();

            // MAGIA VISUAL: Solo agregamos y quitamos la clase CSS
            const textoOriginal = target.textContent;

            target.classList.add("agregado"); // El CSS pone el color amarillo
            target.textContent = "¡INTOXICACIÓN AGREGADA!";

            setTimeout(() => {
                target.classList.remove("agregado"); // Vuelve a la normalidad
                target.textContent = textoOriginal;
            }, 2000);
        }
    }
});

// 6. Funciones de Filtro
const filtrarProductos = (catId: string | null, terminoBusqueda: string): void => {
    let filtrados: Product[] = PRODUCTS;

    if (catId && catId !== "todas") {
        filtrados = filtrados.filter((p: Product) =>
            p.categorias.some((c: ICategory) => c.id.toString() === catId)
        );
    }

    if (terminoBusqueda) {
        const termino = terminoBusqueda.toLowerCase();
        filtrados = filtrados.filter((p: Product) =>
            p.nombre.toLowerCase().includes(termino) ||
            p.descripcion.toLowerCase().includes(termino)
        );
    }

    renderizarProductos(filtrados);
};

buscador?.addEventListener("input", (e: Event) => {
    const categoriaActiva = document.querySelector(".cat-filter.active");
    const catId = categoriaActiva ? categoriaActiva.getAttribute("data-id") : "todas";
    filtrarProductos(catId, (e.target as HTMLInputElement).value);
});

// Inicialización
renderizarCategorias();
renderizarProductos(PRODUCTS);
actualizarContadorCarrito();