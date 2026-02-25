import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appShadow]',
})
export class Shadow {
  @HostBinding('style.boxShadow') boxShadow: string = '2px 2px 5px #ccc';
  constructor() {}
}
