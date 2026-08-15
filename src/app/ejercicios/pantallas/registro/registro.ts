import { Component, computed, signal } from '@angular/core';
import { Reto05PasswordStrength } from '../../reto-05-password-strength/reto-05-password-strength';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Reto05PasswordStrength],
  templateUrl: './registro.html',
})
export class RegistroComponent {
  nombre = signal('');
  email = signal('');
  password = signal('');
  confirmarPassword = signal('');
  aceptaTerminos = signal(false);
  intentoRegistro = signal(false);
  mostrarConfirmarPassword = signal(false);

  emailValido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()));
  passwordTieneEspacios = computed(() => /\s/.test(this.password()));
  camposRequeridosCompletos = computed(() => Boolean(
    this.nombre().trim() && this.email().trim() && this.password() && this.confirmarPassword() && this.aceptaTerminos() && !this.passwordTieneEspacios(),
  ));
  passwordsCoinciden = computed(() => this.confirmarPassword().length > 0 && this.password() === this.confirmarPassword());

  actualizarCampo(campo: 'nombre' | 'email' | 'password' | 'confirmarPassword', evento: Event) {
    this[campo].set((evento.target as HTMLInputElement).value);
  }

  alternarVisibilidadConfirmacion() {
    this.mostrarConfirmarPassword.update((mostrar) => !mostrar);
  }

  actualizarTerminos(evento: Event) {
    this.aceptaTerminos.set((evento.target as HTMLInputElement).checked);
  }

  registrarse() {
    this.intentoRegistro.set(true);
    if (!this.camposRequeridosCompletos() || !this.emailValido() || !this.passwordsCoinciden()) return;

    console.log({
      nombre: this.nombre(),
      email: this.email(),
      password: this.password(),
      confirmarPassword: this.confirmarPassword(),
      aceptaTerminos: this.aceptaTerminos(),
    });
  }
}
