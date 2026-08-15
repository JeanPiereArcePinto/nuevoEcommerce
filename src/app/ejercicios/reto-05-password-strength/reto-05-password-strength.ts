import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, model, signal } from '@angular/core';

type NivelFuerza = 'vacio' | 'debil' | 'media' | 'fuerte';

@Component({
  selector: 'app-reto-05-password-strength',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './reto-05-password-strength.html',
  styleUrl: './reto-05-password-strength.css',
})
export class Reto05PasswordStrength {
  password = model('');
  mostrarPassword = signal(false);

  tieneMinimoCaracteres = computed(() => this.password().length >= 8);
  tieneMinuscula = computed(() => /[a-z]/.test(this.password()));
  tieneMayuscula = computed(() => /[A-Z]/.test(this.password()));
  tieneNumero = computed(() => /[0-9]/.test(this.password()));
  tieneSignoEspecial = computed(() => /[^A-Za-z0-9]/.test(this.password()));

  puntaje = computed(() => {
    const valor = this.password();
    if (!valor) return 0;

    let puntos = 0;
    if (valor.length >= 8) puntos++;
    if (/[a-z]/.test(valor) && /[A-Z]/.test(valor)) puntos++;
    if (/[0-9]/.test(valor)) puntos++;
    if (/[^A-Za-z0-9]/.test(valor)) puntos++;

    return puntos;
  });

  nivel = computed<NivelFuerza>(() => {
    if (!this.password()) return 'vacio';
    if (this.puntaje() <= 1) return 'debil';
    if (this.puntaje() <= 2) return 'media';
    return 'fuerte';
  });

  porcentaje = computed(() => ({ vacio: 0, debil: 33, media: 66, fuerte: 100 })[this.nivel()]);
  estilosBarra = computed(() => ({
    width: `${this.porcentaje()}%`,
    'background-color': ({ vacio: 'white', debil: 'red', media: '#B2B83E', fuerte: 'green' })[this.nivel()],
  }));
  colorTexto = computed(() => ({
    'text-gray-400': this.nivel() === 'vacio',
    'texto-password-debil': this.nivel() === 'debil',
    'text-yellow-500': this.nivel() === 'media',
    'text-green-500': this.nivel() === 'fuerte',
  }));

  actualizarPassword(evento: Event) {
    this.password.set((evento.target as HTMLInputElement).value);
  }

  alternarVisibilidad() {
    this.mostrarPassword.update((mostrar) => !mostrar);
  }
}
