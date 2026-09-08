import { computed, Injectable, signal } from '@angular/core';

export interface Usuario {
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioActual = signal<Usuario | null>(null);

  isLoggedIn = computed(() => this.usuarioActual() !== null);
  usuario = this.usuarioActual.asReadonly();

  login(usuario: Usuario) {
    this.usuarioActual.set(usuario);
  }

  logout() {
    this.usuarioActual.set(null);
  }
}
