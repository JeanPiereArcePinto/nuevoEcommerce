import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { VistaActual } from '../../app';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  texto = signal('');
  textoBuscado = signal('');
  vistaSeleccionada = output<VistaActual>();

  alEscribir(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.texto.set(input.value);
  }

  alBuscar() {
    this.textoBuscado.set(this.texto());
  }
  
  cambiarVista(vista: VistaActual) {
    this.vistaSeleccionada.emit(vista);
  }
}
