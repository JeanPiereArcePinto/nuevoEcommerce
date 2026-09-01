import { Component, output } from '@angular/core';

type VistaActual = 'catalogo' | 'registro' | 'login' | 'admin';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  vistaSeleccionada = output<VistaActual>();
  
  cambiarVista(vista: VistaActual) {
    this.vistaSeleccionada.emit(vista);
  }
}
