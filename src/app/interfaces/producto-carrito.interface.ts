export interface IProductoTienda {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
}

export interface IProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}
