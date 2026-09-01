import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({ selector: 'app-cart', standalone: true, imports: [RouterLink], templateUrl: './cart.html' })
export class CartComponent {
  private readonly router = inject(Router);

  finalizarCompra() {
    this.router.navigate(['/']);
  }
}
