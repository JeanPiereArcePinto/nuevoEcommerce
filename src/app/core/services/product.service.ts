import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';

import { Product, ProductSearchResult } from '../models/product.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly API_URL = `${environment.supabaseUrl}/product`;

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
    return this.http.get<Product[]>(this.API_URL).pipe(
      catchError((err) => {
        console.error('Falló la petición:', err);
        return throwError(() => new Error('No se pudo cargar el catálogo'));
      }),
    );
  }

  buscar(texto: string, categoria: string, pagina: number, tamanoPagina = 10) {
    const offset = (pagina - 1) * tamanoPagina;
    const termino = texto.trim();
    const filtrosCategoria = this.filtrosPorCategoria[categoria];
    const parametros = new URLSearchParams({
      offset: String(offset),
      limit: String(tamanoPagina),
      order: 'name.asc',
    });

    if (termino) {
      parametros.set('name', `ilike.*${termino}*`);
    }
    if (filtrosCategoria) {
      parametros.set('or', `(${filtrosCategoria.map((filtro) => `name.ilike.*${filtro}*`).join(',')})`);
    }

    return this.http.get<Product[]>(`${this.API_URL}?${parametros}`, {
      headers: new HttpHeaders({ Prefer: 'count=exact' }),
      observe: 'response',
    }).pipe(
      map((respuesta: HttpResponse<Product[]>) => ({
        productos: respuesta.body ?? [],
        total: this.obtenerTotal(respuesta.headers.get('content-range'), respuesta.body?.length ?? 0),
      } satisfies ProductSearchResult)),
    );
  }

  readonly categorias = ['Computadoras', 'Audio', 'Telefonia', 'Gaming', 'Hogar y oficina', 'Accesorios'];

  private readonly filtrosPorCategoria: Record<string, string[]> = {
    Computadoras: ['laptop', 'macbook', 'monitor', 'tablet', 'ipad'],
    Audio: ['aud', 'parlante', 'micr'],
    Telefonia: ['iphone', 'galaxy', 'smartwatch', 'celular'],
    Gaming: ['gamer', 'play station', 'playstation', 'xbox', 'nintendo'],
    'Hogar y oficina': ['refrigeradora', 'impresora', 'robot', 'proyector', 'escritorio', 'silla'],
    Accesorios: ['mouse', 'teclado', 'cargador', 'starlink'],
  };

  private obtenerTotal(contentRange: string | null, fallback: number): number {
    const total = Number(contentRange?.split('/')[1]);
    return Number.isFinite(total) ? total : fallback;
  }

  crear(producto: Partial<Product>) {
    return this.http.post<Product[]>(this.API_URL, producto);
  }

  actualizar(id: string, cambios: Partial<Product>) {
    return this.http.patch<Product[]>(`${this.API_URL}?id=eq.${id}`, cambios);
  }

  eliminar(id: string) {
    return this.http.delete(`${this.API_URL}?id=eq.${id}`);
  }
}
