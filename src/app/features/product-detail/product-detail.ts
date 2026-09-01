import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PrecioSolesPipe } from '../../shared/pipes/precio-soles-pipe';
import { ProductService } from '../../core/services/product.service';

type PanelDetalle = 'detalles' | 'envios' | 'disponibilidad';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, PrecioSolesPipe],
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent {
  readonly id = input.required<string>();
  readonly productService = inject(ProductService);
  private readonly title = inject(Title);

  readonly producto = computed(() =>
    this.productService.productos().find((producto) => producto.id === this.id()),
  );
  readonly cantidad = signal(1);
  readonly agregado = signal(false);
  readonly panelAbierto = signal<PanelDetalle | null>('detalles');

  constructor() {
    effect(() => {
      const producto = this.producto();
      this.title.setTitle(producto ? `${producto.name} | NitroShop` : 'Detalle | NitroShop');
    });
  }

  disminuir() {
    this.cantidad.update((valor) => Math.max(1, valor - 1));
  }

  aumentar() {
    const stock = this.producto()?.stock ?? 1;
    this.cantidad.update((valor) => Math.min(stock, valor + 1));
  }

  agregarAlCarrito() {
    if (!this.producto()?.stock) return;

    this.agregado.set(true);
    setTimeout(() => this.agregado.set(false), 2000);
  }

  alternarPanel(panel: PanelDetalle) {
    this.panelAbierto.update((actual) => actual === panel ? null : panel);
  }
}
