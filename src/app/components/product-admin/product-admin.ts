import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-admin.html',
  styleUrl: './product-admin.css',
})
export class ProductAdminComponent {
  readonly productService = inject(ProductService);

  nombre = '';
  precio: number | null = null;
  imagen = '';
  stock: number | null = null;
  idEnEdicion: string | null = null;

  readonly guardando = signal(false);
  readonly mensaje = signal<string | null>(null);
  readonly errorOperacion = signal<string | null>(null);

  guardar() {
    if (!this.nombre.trim() || this.precio === null || this.stock === null) {
      this.errorOperacion.set('Completa el nombre, precio y stock');
      return;
    }

    const cambios: Partial<Product> = {
      name: this.nombre.trim(),
      price: this.precio,
      image: this.imagen.trim(),
      stock: this.stock,
    };
    const peticion = this.idEnEdicion
      ? this.productService.actualizar(this.idEnEdicion, cambios)
      : this.productService.crear(cambios);

    this.guardando.set(true);
    this.mensaje.set(null);
    this.errorOperacion.set(null);

    peticion.subscribe({
      next: () => {
        this.mensaje.set(this.idEnEdicion ? 'Producto actualizado.' : 'Producto creado.');
        this.limpiarFormulario();
        this.productService.recargar();
        this.guardando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorOperacion.set('No se pudo guardar el producto');
        this.guardando.set(false);
      },
    });
  }

  cargarParaEditar(producto: Product) {
    this.idEnEdicion = producto.id;
    this.nombre = producto.name;
    this.precio = producto.price;
    this.imagen = producto.image;
    this.stock = producto.stock;
    this.mensaje.set(null);
    this.errorOperacion.set(null);
  }

  eliminar(id: string) {
    this.mensaje.set(null);
    this.errorOperacion.set(null);

    this.productService.eliminar(id).subscribe({
      next: () => {
        if (this.idEnEdicion === id) {
          this.limpiarFormulario();
        }
        this.mensaje.set('Producto eliminado');
        this.productService.recargar();
      },
      error: (err) => {
        console.error(err);
        this.errorOperacion.set('No se pudo eliminar el producto');
      },
    });
  }

  cancelarEdicion() {
    this.limpiarFormulario();
    this.errorOperacion.set(null);
  }

  private limpiarFormulario() {
    this.nombre = '';
    this.precio = null;
    this.imagen = '';
    this.stock = null;
    this.idEnEdicion = null;
  }
}
export { signal };

