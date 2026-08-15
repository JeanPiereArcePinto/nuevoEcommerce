import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card';
import { IProductoCarrito, IProductoTienda } from '../../interfaces/producto-carrito.interface';
import { CurrencyPipe } from '@angular/common';
import { PrecioSolesPipe } from '../../pipes/precio-soles-pipe';

@Component({
  selector: 'app-demo-carrito',
  standalone: true,
  imports: [ProductCardComponent, PrecioSolesPipe, CurrencyPipe],
  templateUrl: './demo-carrito.html',
})
export class DemoCarritoComponent {
  // TODO: crea carrito = signal<ItemCarrito[]>([]) (ver
  // ../../models/carrito.model.ts), los métodos totalItems()/totalSoles()
  // que lo recorran, y onAddToCart(item) que agregue el producto (sumando
  // la cantidad si el id ya existe). Escúchalo con
  // (addToCart)="onAddToCart($event)" en cada <app-product-card />.

  elementosCarrito: IProductoCarrito[] = []

  productos: IProductoTienda[] = [
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
  ];

  manejarAgregarAlCarrito(data: IProductoCarrito){
    const productoExistente = this.elementosCarrito.find((item) => item.id === data.id);
    const productoTienda = this.productos.find((producto) => producto.id === data.id);

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
