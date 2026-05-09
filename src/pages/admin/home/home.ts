import { checkAuhtUser, logout } from "../../../utils/auth";

// 1. Seguridad: Verificar que el usuario sea estrictamente ADMIN
// Si no hay usuario -> lo patea al login
// Si el usuario es 'client' -> lo patea a la tienda del cliente
checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/client/home/home.html",
    "admin"
);

// 2. Botón de cerrar sesión
document.getElementById("logoutButton")?.addEventListener("click", logout);