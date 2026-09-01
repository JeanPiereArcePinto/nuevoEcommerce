import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioSoles',
})
export class PrecioSolesPipe implements PipeTransform {
  transform(precio: number): string {
    return `S/ ${precio.toFixed(2)}`;
  }
}
