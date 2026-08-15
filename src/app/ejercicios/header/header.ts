import { Component, output } from '@angular/core';
import { VistaActual } from '../../app';

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
