import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-buy-button',
  imports: [NgStyle],
  templateUrl: './buy-button.html',
  styleUrl: './buy-button.css',
})
export class BuyButton {
  @Input() buttonText: string = "Buy";
  @Input() buttonColor: string = "green";
  @Input() buttonFunctionality: () => unknown = () => {};
  @Output() buttonClicked = new EventEmitter<void>();
  constructor(){

  }

  handleClick(){
    this.buttonFunctionality();
    this.buttonClicked.emit();
  }
  

}
