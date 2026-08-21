import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly API_URL = `${environment.supabaseUrl}/product`;
  private readonly API_KEY = environment.supabaseKey;

  private readonly headers = {
    apikey: this.API_KEY,
    Authorization: `Bearer ${this.API_KEY}`,
  };

  private readonly headersEscritura = {
    ...this.headers,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  readonly error = signal<string | null>(null);
  readonly productos = signal<Product[]>([]);
  private readonly trigger = signal(0);

  constructor() {
    effect((onCleanup) => {
      this.trigger();
      this.error.set(null);

      const subscription = this.listar()
        .pipe(
          catchError(() => {
            this.error.set('No se pudieron cargar los productos');
            return of([] as Product[]);
          }),
        )
        .subscribe((data) => this.productos.set(data));

      onCleanup(() => subscription.unsubscribe());
    });
  }

  recargar() {
    this.trigger.update((value) => value + 1);
  }

  listar() {
    return this.http.get<Product[]>(this.API_URL, { headers: this.headers }).pipe(
      catchError((err) => {
        console.error('Falló la petición:', err);
        return throwError(() => new Error('No se pudo cargar el catálogo'));
      }),
    );
  }

  crear(producto: Partial<Product>) {
    return this.http.post<Product[]>(this.API_URL, producto, {
      headers: this.headersEscritura,
    });
  }

  actualizar(id: string, cambios: Partial<Product>) {
    return this.http.patch<Product[]>(`${this.API_URL}?id=eq.${id}`, cambios, {
      headers: this.headersEscritura,
    });
  }

  eliminar(id: string) {
    return this.http.delete(`${this.API_URL}?id=eq.${id}`, {
      headers: this.headersEscritura,
    });
  }
}
