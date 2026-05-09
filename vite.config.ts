import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                // La página principal de entrada
                main: resolve(__dirname, 'index.html'),

                // PÁGINAS DEL PARCIAL

                // Autenticación
                login: resolve(__dirname, 'src/pages/auth/login/login.html'),
                registro: resolve(__dirname, 'src/pages/auth/registro/registro.html'),

                // Cliente
                homeClient: resolve(__dirname, 'src/pages/client/home/home.html'),

                // Carrito
                cart: resolve(__dirname, 'src/store/cart/cart.html'),
            },
        },
    },
    base: './', // Fundamental para que las rutas de imágenes y CSS no se rompan
});