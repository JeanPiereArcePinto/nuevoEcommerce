import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  checkoutForm = this.fb.nonNullable.group({
    nombreCompleto: ['', Validators.required],
    direccion: ['', Validators.required],
    numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
  });

  get nombreCompleto() { return this.checkoutForm.get('nombreCompleto'); }
  get direccion() { return this.checkoutForm.get('direccion'); }
  get numeroTarjeta() { return this.checkoutForm.get('numeroTarjeta'); }
  get cvv() { return this.checkoutForm.get('cvv'); }

  confirmarPedido() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    console.log('Pedido confirmado', this.checkoutForm.value);
  }
}
