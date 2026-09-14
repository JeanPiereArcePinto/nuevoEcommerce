import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  templateUrl: './product-filter.html',
})
export class ProductFilterComponent {
  readonly texto = input('');
  readonly mostrarBusqueda = input(true);
  readonly categoria = input('');
  readonly categorias = input<string[]>([]);
  readonly textoChange = output<string>();
  readonly categoriaChange = output<string>();

  actualizarTexto(evento: Event) {
    this.textoChange.emit((evento.target as HTMLInputElement).value);
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaChange.emit(categoria);
  }
}
