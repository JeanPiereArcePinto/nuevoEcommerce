// Interfaces del dominio "carrito de compras".
// Se usan tanto en AppComponent (estado del carrito) como en ProductCardComponent (inputs).

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
}

// Un ítem del carrito: lo mínimo que necesita el resumen (sin emoji/imagen,
// que solo se usa dentro de la tarjeta del producto).
export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  qty: number;
}
