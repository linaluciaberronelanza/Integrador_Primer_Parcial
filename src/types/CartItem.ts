import type { Product } from "./Product";

export interface CartItem {
    producto: Product;
    cantidad: number;
}