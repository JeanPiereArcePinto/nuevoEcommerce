import { Component, input, model, output } from '@angular/core';
import { IProductoCarrito, IProductoTienda } from '../../../core/models/producto-carrito.interface';
import { EstadoStockPipe } from '../../pipes/estado-stock-pipe';
import { PrecioSolesPipe } from '../../pipes/precio-soles-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [EstadoStockPipe, PrecioSolesPipe, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  // TODO: agrega los input.required<>() para id, nombre, precio, imagen
  // e imagenAlt; un model<number>(1) llamado "cantidad" con sus métodos
  // incrementar()/decrementar() (mínimo 1, sin máximo); y un output()
  // llamado "addToCart" con un método agregarAlCarrito() que emita
  // { id, nombre, precio, cantidad }.

  id = input.required<string>()
  nombre = input.required<string>()
  precio = input.required<number>()
  imagen = input.required<string>()
  stock = input.required<number>()
  esFavorito = input<boolean>(false)
  soloDetalle = input<boolean>(false)

  cantidad = model<number>(1)

  addToCart = output<IProductoCarrito>()
  toggleFavorito = output<IProductoTienda>()

  incrementar(){
    const stockDisponible = this.stock();
    const cantidadActual = this.cantidad();

    if (cantidadActual < stockDisponible) {
      this.cantidad.update((valorActual) => valorActual + 1);
    }
  }

  reducir(){
    this.cantidad.update((valorActual)=>{
      if(valorActual === 1){
        return 1
      }
      return valorActual - 1
    })
  }

  agregarAlCarrito(){
    if (this.stock() === 0) {
      return;
    }
    this.addToCart.emit({
      id: this.id(),
      precio: this.precio(),
      nombre: this.nombre(),
      cantidad: this.cantidad(),
      imagen: this.imagen()
    })
  }

  alternarFavorito() {
    this.toggleFavorito.emit({
      id: this.id(),
      nombre: this.nombre(),
      precio: this.precio(),
      imagen: this.imagen(),
      stock: this.stock()
    });
  }

}
