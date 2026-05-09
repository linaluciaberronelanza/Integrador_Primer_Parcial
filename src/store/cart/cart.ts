import { checkAuhtUser, logout } from "../../utils/auth";
import type { Product } from "../../types/Product";
import type { CartItem } from "../../types/CartItem";

// --- PERSISTENCIA DINÁMICA POR USUARIO ---

// 1. Función para obtener una llave única basada en el email del usuario activo
const getCartKey = (): string => {
    // Leemos la "tarjeta de acceso temporal" donde guardas al usuario logueado
    const userDataStr = localStorage.getItem("userData");

    if (userDataStr) {
        const usuarioActivo = JSON.parse(userDataStr);

        if (usuarioActivo && usuarioActivo.email) {
            // Si el usuario es lina@gmail.com, crea la llave: carrito_lina@gmail.com
            return `carrito_${usuarioActivo.email}`;
        }
    }
    // Llave de respaldo de seguridad
    return "carritoEnmohecido_default";
};

export const getCart = (): CartItem[] => {
    const cartStr = localStorage.getItem(getCartKey());
    return cartStr ? JSON.parse(cartStr) : [];
};

export const saveCart = (cart: CartItem[]): void => {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
};

export const addToCart = (producto: Product): void => {
    const cart: CartItem[] = getCart();
    const existingItem = cart.find((item: CartItem) => item.producto.id === producto.id);
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({ producto, cantidad: 1 });
    }
    saveCart(cart);
};

export const getCartCount = (): number => {
    const cart: CartItem[] = getCart();
    return cart.reduce((total: number, item: CartItem) => total + item.cantidad, 0);
};

export const updateQuantity = (productId: number, change: number): void => {
    let cart: CartItem[] = getCart();
    const itemIndex = cart.findIndex((item: CartItem) => item.producto.id === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].cantidad += change;
        if (cart[itemIndex].cantidad <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
    }
};

// --- LÓGICA DE LA VISTA ---
if (typeof window !== "undefined" && document.getElementById("cart-items-container")) {
    checkAuhtUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");
    document.getElementById("logoutButton")?.addEventListener("click", logout);

    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotalElement = document.getElementById("cart-total");
    const cartCountSpan = document.getElementById("cart-count");

    const renderizarCarrito = (): void => {
        if (!cartItemsContainer || !cartTotalElement) return;

        const cart: CartItem[] = getCart();
        if (cartCountSpan) cartCountSpan.textContent = getCartCount().toString();

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <h3>Tu carrito está peligrosamente vacío...</h3>
                    <p>Ve al catálogo para agregar algunas delicias caducadas.</p>
                </div>`;
            cartTotalElement.textContent = "$0.00";
            return;
        }

        let totalGeneral = 0;
        let tablaHtml = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>`;

        cart.forEach((item: CartItem) => {
            const subtotal = item.producto.precio * item.cantidad;
            totalGeneral += subtotal;

            tablaHtml += `
                <tr>
                    <td>
                        <div class="cart-item-info">
                            <img src="${item.producto.imagen}" alt="${item.producto.nombre}" class="cart-item-img">
                            <span>${item.producto.nombre}</span>
                        </div>
                    </td>
                    <td>$${item.producto.precio}</td>
                    <td>
                        <div class="cart-qty-controls">
                            <button class="btn-qty btn-restar" data-id="${item.producto.id}">-</button>
                            <span class="cart-qty-number">${item.cantidad}</span>
                            <button class="btn-qty btn-sumar" data-id="${item.producto.id}">+</button>
                        </div>
                    </td>
                    <td class="cart-subtotal">$${subtotal}</td>
                </tr>`;
        });

        tablaHtml += `</tbody></table>`;
        cartItemsContainer.innerHTML = tablaHtml;
        cartTotalElement.textContent = `$${totalGeneral.toFixed(2)}`;
    };

    // Escucha de eventos para sumar/restar
    cartItemsContainer?.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("btn-sumar")) {
            const id = Number(target.getAttribute("data-id"));
            updateQuantity(id, 1);
            renderizarCarrito();
        }
        else if (target.classList.contains("btn-restar")) {
            const id = Number(target.getAttribute("data-id"));
            updateQuantity(id, -1);
            renderizarCarrito();
        }
    });

    // COMPRA FINAL
    const btnConfirmar = document.querySelector(".btn-confirmar");
    btnConfirmar?.addEventListener("click", () => {
        const carritoActual = getCart();

        if (carritoActual.length === 0) {
            alert("No puedes comprar la nada misma. Agrega algo putrefacto primero.");
            return;
        }

        // 1. Mensaje de éxito al usuario
        alert("¡COMPRA CONFIRMADA! Tus delicias en descomposición van en camino.");

        // 2. Limpieza de persistencia usando nuestra función dinámica
        localStorage.removeItem(getCartKey());

        // 3. Volvemos a renderizar para que la pantalla se actualice al instante
        renderizarCarrito();
    });

    renderizarCarrito();
}