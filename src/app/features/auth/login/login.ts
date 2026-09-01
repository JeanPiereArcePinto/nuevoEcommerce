import { Component, computed, signal } from '@angular/core';
import { Reto05PasswordStrength } from '../../../shared/ui/password-strength/password-strength';

@Component({
  selector: 'app-login',
  imports: [Reto05PasswordStrength],
  standalone: true,
  templateUrl: './login.html',
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  recordarme = signal(false);
  intentoLogin = signal(false);

  emailValido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()));
  passwordTieneEspacios = computed(() => /\s/.test(this.password()));
  camposCompletos = computed(() => Boolean(this.email().trim() && this.password()));

  actualizarEmail(evento: Event) {
    this.email.set((evento.target as HTMLInputElement).value);
  }

  actualizarRecordarme(evento: Event) {
    this.recordarme.set((evento.target as HTMLInputElement).checked);
  }

  iniciarSesion() {
    this.intentoLogin.set(true);
    if (!this.camposCompletos() || !this.emailValido() || this.passwordTieneEspacios()) return;

    console.log({
      email: this.email(),
      password: this.password(),
      recordarme: this.recordarme(),
    });
  }
}
