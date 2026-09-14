import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-product-pagination',
  standalone: true,
  templateUrl: './product-pagination.html',
})
export class ProductPaginationComponent {
  readonly pagina = input.required<number>();
  readonly totalPaginas = input.required<number>();
  readonly cambioPagina = output<number>();

  readonly paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, indice) => indice + 1));

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.cambioPagina.emit(pagina);
    }
  }
}
