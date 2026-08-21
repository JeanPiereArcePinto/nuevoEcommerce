import { Component, computed, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card';
import { IProductoCarrito, IProductoTienda } from '../../interfaces/producto-carrito.interface';
import { PrecioSolesPipe } from '../../pipes/precio-soles-pipe';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-demo-carrito',
  standalone: true,
  imports: [ProductCardComponent, PrecioSolesPipe],
  templateUrl: './demo-carrito.html',
})
export class DemoCarritoComponent {
  readonly productService = inject(ProductService);
  // TODO: crea carrito = signal<ItemCarrito[]>([]) (ver
  // ../../models/carrito.model.ts), los métodos totalItems()/totalSoles()
  // que lo recorran, y onAddToCart(item) que agregue el producto (sumando
  // la cantidad si el id ya existe). Escúchalo con
  // (addToCart)="onAddToCart($event)" en cada <app-product-card />.

  elementosCarrito: IProductoCarrito[] = []
  textoBusqueda = signal('');
  favoritos = signal<IProductoTienda[]>([]);
  contadorFavoritos = computed(() => this.favoritos().length);

  productosLocales = [
    { id: 1, nombre: 'Smartwatch Watch 7 Small Green"', precio: 599, imagen: 'https://media.falabella.com/tottusPE/43377809_1/w=800,h=800,fit=pad', stock: 7 },
    { id: 2, nombre: 'Audífonos Bluetooth Samsung Galaxy Buds 4 Pro Black', precio: 450, imagen: 'https://media.falabella.com/falabellaPE/21397928_01/w=1004,h=1500,fit=pad', stock: 3 },
    { id: 3, nombre: 'Refrigeradora French Door Family Hub 677L', precio: 7699, imagen: 'https://images.samsung.com/is/image/samsung/p6pim/pe/rf32cg5910b1pe/gallery/pe-3door-french-door-large-capacity-with-spacemax-technology-rf32cg5910b1pe-538509120?$1164_776_PNG$', stock: 5 },
    { id: 4, nombre: 'Televisor Samsung 50 Mini LED M70H Vision AI Smart TV 2026', precio: 1199, imagen: 'https://media.falabella.com/falabellaPE/80044184_1/w=1200,h=1200,fit=pad', stock: 0 },
    { id: 5, nombre: 'Galaxy S26 Ultra 512GB 12GB RAM + REGALOS', precio: 3990, imagen: 'https://media.falabella.com/falabellaPE/154734276_01/w=1200,h=1200,fit=pad', stock: 2 },
    { id: 6, nombre: 'Mouse gamer inalámbrico Logitech G Series', precio: 250, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSn8AJPy30wbAsrQCMe_dmI0DqhuoGB7gAvKcNp2k0nwRB_ThZuYftWUW&s=10', stock: 13 },
    { id: 7, nombre: 'Teclado Logitech G213 Prodigy', precio: 190, imagen: 'https://media.falabella.com/falabellaPE/138143493_01/w=1500,h=1500,fit=cover', stock: 9 },
    { id: 8, nombre: 'Tablet SAMSUNG S6 LITE 2024"', precio: 1050, imagen: 'https://plazavea.vteximg.com.br/arquivos/ids/30847221-418-418/20423244-1.jpg', stock: 0 },
    { id: 9, nombre: 'Monitor Samsung LED 24', precio: 390, imagen: 'https://www.kabifperu.com/imagenes/prod-05022021114349-monitor-samsung-led-24-s24f354fhl-hdmi-deta.png', stock: 5 },
    { id: 10, nombre: 'Parlante JBL Go 4 Acuatico', precio: 170, imagen: 'https://oechsle.vteximg.com.br/arquivos/ids/21994563-1000-1000/imageUrl_1.jpg?v=638925643978770000', stock: 14 },
    { id: 11, nombre: 'Laptop Gamer Victus by HP', precio: 3999, imagen: 'https://media.falabella.com/falabellaPE/21479769_01/w=1200,h=1200,fit=pad', stock: 11 },
    { id: 12, nombre: 'Consola Play Station 5 Slim Standard 1Tb', precio: 2300, imagen: 'https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/s/ps5-consola-slim-standard-bundle-returnal-ratchet-clank-80861-default-1.jpg', stock: 13 },
    { id: 13, nombre: 'LG QNED AI Mini LED QNED70 4K Smart TV', precio: 1290, imagen: 'https://media.falabella.com/falabellaPE/80053314_1/w=1200,h=1200,fit=pad', stock: 17 },
    { id: 14, nombre: 'iPhone 17 Pro 256GB', precio: 5200, imagen: 'https://media.falabella.com/falabellaPE/21283549_01/w=1200,h=1200,fit=pad', stock: 5 },
    { id: 15, nombre: 'Consola Rog Xbox Ally X Amd Ryzen Ai Z2', precio: 3700, imagen: 'https://media.falabella.com/falabellaPE/80085036_1/w=1200,h=1200,fit=pad', stock: 19 },
    { id: 16, nombre: 'Nintendo Switch 2', precio: 2200, imagen: 'https://www.lacuracao.pe/media/catalog/product/t/w/twvs4001063_1.jpg?quality=85&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', stock: 9 },
    { id: 17, nombre: 'Silla Gamer Ergonómica Dreizt Shine', precio: 350, imagen: 'https://media.falabella.com/falabellaPE/147266686_01/w=1200,h=1200,fit=pad', stock: 6 },
    { id: 18, nombre: 'Sony ZV-E10 Mirrorless Camera', precio: 2650, imagen: 'https://media.falabella.com/falabellaPE/122940192_01/w=1200,h=1200,fit=pad', stock: 12 },
    { id: 19, nombre: 'Parlante Inteligente Amazon Echo Dot', precio: 200, imagen: 'https://media.falabella.com/falabellaPE/153496045_02/w=1200,h=1200,fit=pad', stock: 20 },
    { id: 20, nombre: 'Impresora Multifuncional EcoTank L4360', precio: 799, imagen: 'https://media.falabella.com/falabellaPE/146437938_01/w=1200,h=1200,fit=pad', stock: 13 },
    { id: 21, nombre: 'Apple MacBook Pro 2019', precio: 2750, imagen: 'https://media.falabella.com/falabellaPE/142904286_01/w=1200,h=1200,fit=pad', stock: 8 },
    { id: 22, nombre: 'Samsung Proyector Portátil The Freestyle 2.0', precio: 1500, imagen: 'https://media.falabella.com/falabellaPE/21362542_01/w=1200,h=1200,fit=pad', stock: 4 },
    { id: 23, nombre: 'Robot Aspirador Dreame D30 Ultra"', precio: 2300, imagen: 'https://media.falabella.com/falabellaPE/155403224_01/w=1200,h=1200,fit=pad', stock: 17 },
    { id: 24, nombre: 'Cámara de seguridad WiFi 6, Doble lente Panorámico', precio: 119, imagen: 'https://media.falabella.com/falabellaPE/150914135_01/w=1200,h=1200,fit=pad', stock: 11 },
    { id: 25, nombre: 'Starlink Mini Kit Ac Dualband', precio: 899, imagen: 'https://media.falabella.com/falabellaPE/20735443_1/w=1200,h=1200,fit=pad', stock: 9 },
    { id: 26, nombre: 'Escritorio Gamer Negro Fibra de Carbono', precio: 240, imagen: 'https://media.falabella.com/falabellaPE/152419625_01/w=1200,h=1200,fit=pad', stock: 15 },
    { id: 27, nombre: 'Cargador Portátil Xiaomi', precio: 99, imagen: 'https://media.falabella.com/falabellaPE/147198028_02/w=1200,h=1200,fit=pad', stock: 13 },
    { id: 28, nombre: 'Audifonos Gamer Logitech G733', precio: 490, imagen: 'https://media.falabella.com/falabellaPE/139995805_01/w=1200,h=1200,fit=pad', stock: 8 },
    { id: 29, nombre: 'iPad Pro 13 256GB', precio: 5000, imagen: 'https://media.falabella.com/falabellaPE/148363787_03/w=1200,h=1200,fit=pad', stock: 10 },
    { id: 30, nombre: 'Micrófono DJI Mic 3', precio: 1300, imagen: 'https://media.falabella.com/falabellaPE/146713301_01/w=1200,h=1200,fit=pad', stock: 7 },    
  ];

  productosFiltrados = computed(() => {
    const texto = this.textoBusqueda().trim().toLocaleLowerCase();
    const productos = this.productService.productos();

    if (!texto) {
      return productos;
    }

    return productos.filter((producto) =>
      producto.name.toLocaleLowerCase().includes(texto)
    );
  });

  actualizarBusqueda(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.textoBusqueda.set(input.value);
  }

  manejarToggleFavorito(producto: IProductoTienda) {
    this.favoritos.update((favoritosActuales) => {
      const yaEsFavorito = favoritosActuales.some((favorito) => favorito.id === producto.id);

      return yaEsFavorito
        ? favoritosActuales.filter((favorito) => favorito.id !== producto.id)
        : [...favoritosActuales, producto];
    });
  }

  esFavorito(productoId: string) {
    return this.favoritos().some((favorito) => favorito.id === productoId);
  }

  manejarAgregarAlCarrito(data: IProductoCarrito){
    const productoExistente = this.elementosCarrito.find((item) => item.id === data.id);
    const productoTienda = this.productService
      .productos()
      .find((producto) => producto.id === data.id);

    if (!productoTienda || productoTienda.stock === 0) {
      return;
    }

    if (productoExistente) {
      const nuevaCantidad = productoExistente.cantidad + data.cantidad;

      if (nuevaCantidad > productoTienda.stock) {
        return;
      }

      productoExistente.cantidad = nuevaCantidad;
      return;
    }

    if (data.cantidad > productoTienda.stock) {
      return;
    }

    this.elementosCarrito.push(data);
  }

  calcularArticulosSeleccionadosPorTipo() {
    return this.elementosCarrito.length;
  }

  calcularCantidad(){
    let cantidadTotal = 0
    for(let index = 0; index < this.elementosCarrito.length; index++){
      cantidadTotal += this.elementosCarrito[index].cantidad
    }
    return cantidadTotal
  }

  calcularPrecioTotal(){
    let precioTotal = 0
    for(let index = 0; index < this.elementosCarrito.length; index++){
      precioTotal += (this.elementosCarrito[index].cantidad * this.elementosCarrito[index].precio)
    }
    return precioTotal
  }
}
