import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

interface Coleccion {
  nombre: string;
  imagen: string;
}

interface Categoria {
  nombre: string;
  icono: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent {
  readonly productService = inject(ProductService);
  readonly productosTendencia = computed(() =>
    this.productService.productos().slice(0, 4),
  );

  readonly colecciones: Coleccion[] = [
    { nombre: 'Gaming', imagen: 'https://tvbrics.com/upload/dev2fun.imagecompress/webp/resize_cache/iblock/b74/1000_1000_1/t7fgnc3uo91jbhdjn69kgrxbnppijib5.webp' },
    { nombre: 'Trabajo y estudio', imagen: 'https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg' },
    { nombre: 'Electrohogar', imagen: 'https://assets.nabaliaenergia.com/site/blog/que-electrodomesticos-consumen-mas.webp' },
    { nombre: 'Smart Home', imagen: 'https://odylhouse.com/wp-content/uploads/2023/03/smarthome-e1539869677921.jpeg' },
  ];

  readonly categorias: Categoria[] = [
    { nombre: 'Celulares', icono: '📱' },
    { nombre: 'Laptops', icono: '💻' },
    { nombre: 'Audio', icono: '🎧' },
    { nombre: 'Consolas', icono: '🎮' },
    { nombre: 'Monitores', icono: '🖥️' },
    { nombre: 'Accesorios', icono: '⌨️' },
    { nombre: 'Electrodomesticos', icono: '🔌' },
  ];
}
