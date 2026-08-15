import { Component, signal } from '@angular/core';
import { DemoCarritoComponent } from './ejercicios/demo-carrito/demo-carrito';
import { Header } from './ejercicios/header/header';
import { Footer } from './ejercicios/footer/footer';
import { RegistroComponent } from './ejercicios/pantallas/registro/registro';

export type VistaActual = 'catalogo' | 'registro';

// AppComponent no tiene lógica propia: solo decide, vía app.html, cuál de los
// 9 ejercicios se muestra en pantalla. Para cambiar de ejercicio, comenta el
// que está activo y descomenta el que quieras mostrar (ver app.html).
//
// NOTA: por eso quedan varios imports "sin usar" en el template a la vez;
// está permitido a propósito (ver angularCompilerOptions.extendedDiagnostics
// en tsconfig.json) para no tener que tocar este archivo al cambiar de demo.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header, 
    Footer,
    DemoCarritoComponent,
    RegistroComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  vistaActual = signal<VistaActual>('catalogo');
}
