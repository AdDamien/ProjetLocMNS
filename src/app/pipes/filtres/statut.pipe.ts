import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statut'
})
export class StatutPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
