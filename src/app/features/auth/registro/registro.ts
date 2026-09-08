import { Component, inject, signal } from '@angular/core';
import { Reto05PasswordStrength } from '../../../shared/ui/password-strength/password-strength';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';



export function passwordsIguales(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmar = group.get('confirmarPassword')?.value;
    return password === confirmar ? null : { passwordsNoCoinciden: true };
  };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Reto05PasswordStrength, ReactiveFormsModule],
  templateUrl: './registro.html',
})
export class RegistroComponent {
  private fb = inject(FormBuilder);

  registroForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
    aceptaTerminos: [false, Validators.requiredTrue],
  }, { validators: passwordsIguales() });

  mostrarConfirmarPassword = signal(false);

  actualizarPassword(password: string) {
    this.registroForm.controls.password.setValue(password);
    this.registroForm.controls.password.markAsDirty();
  }

  alternarVisibilidadConfirmacion() {
    this.mostrarConfirmarPassword.update((mostrar) => !mostrar);
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
  }
}

