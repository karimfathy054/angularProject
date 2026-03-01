import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { products } from '../../db';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-slider',
  imports: [NgClass],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  items: IProduct[] = [];
  currentIndex: number = 0;

  constructor() {
    this.items = products.slice(0, 5);
  }

  prev() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  next() {
    this.currentIndex = Math.min(this.items.length - 1, this.currentIndex + 1);
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
