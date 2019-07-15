import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const result = value.split(' ').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');

    return result;
  }

}
