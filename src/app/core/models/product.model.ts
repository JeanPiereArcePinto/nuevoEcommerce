export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface ProductSearchResult {
  productos: Product[];
  total: number;
}
