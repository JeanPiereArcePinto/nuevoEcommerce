import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  texto: string;
  ruta?: string;
}

interface FooterColumn {
  titulo: string;
  enlaces: FooterLink[];
}

const COLUMNAS: FooterColumn[] = [
  {
    titulo: 'Recursos',
    enlaces: [
      { texto: 'Encuentra una tienda' },
      { texto: 'Guía de tallas' },
      { texto: 'Estado del pedido' },
      { texto: 'Devoluciones' },
    ],
  },
  {
    titulo: 'Ayuda',
    enlaces: [
      { texto: 'Contáctanos' },
      { texto: 'Preguntas frecuentes' },
      { texto: 'Envíos' },
      { texto: 'Métodos de pago' },
    ],
  },
  {
    titulo: 'Compañía',
    enlaces: [
      { texto: 'Sobre NitroShop' },
      { texto: 'Noticias' },
      { texto: 'Sostenibilidad' },
      { texto: 'Empleo' },
    ],
  },
  {
    titulo: 'Promociones',
    enlaces: [
      { texto: 'Ofertas' },
      { texto: 'Programa de membresía' },
      { texto: 'Tarjetas de regalo' },
    ],
  },
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly columnas = COLUMNAS;
  readonly year = new Date().getFullYear();
}
