import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  texto = signal('');
  textoBuscado = signal('');

  alEscribir(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.texto.set(input.value);
  }

  alBuscar() {
    this.textoBuscado.set(this.texto());
  }
}
