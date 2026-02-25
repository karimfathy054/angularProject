import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appZoomImage]',
})
export class ZoomImage {
  @HostBinding('style.cursor') cursor: string = 'zoom-in';
  @HostBinding('style.transition') transition: string = 'transform 0.1s ease';
  @HostBinding('style.transform') transform: string = 'scale(1)';
  @HostBinding('style.transformOrigin') transformOrigin: string = 'center';
  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.transformOrigin = `${x}% ${y}%`;
    this.transform = `scale(1.5)`;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.transform = 'scale(1)';
  }
  constructor() {}
}
