import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-buy-button',
  imports: [NgStyle],
  templateUrl: './buy-button.html',
  styleUrl: './buy-button.css',
})
export class BuyButton {
  @Input() buttonText: string = 'Buy';
  @Input() buttonColor: string = 'green';
  @Input() isActive: boolean = true;
  @Output() buttonClicked = new EventEmitter<void>();
  constructor() {}

  handleClick() {
    if (this.isActive) {
      this.buttonClicked.emit();
    } else {
      alert('Product is out of stock');
    }
  }
}
