import { Component } from '@angular/core';
import { DemoCarritoComponent } from './demo-carrito/demo-carrito';
@Component({ selector: 'app-product-list', standalone: true, imports: [DemoCarritoComponent], template: '<app-demo-carrito />' })
export class ProductListComponent {}
