import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  items: IProduct[] = [];
  currentIndex: number = 0;

  constructor() {
    fetch('https://dummyjson.com/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        this.items = data.products;
        console.log('Slider Component: Data loaded', this.items);
      })
      .catch((err) => {
        console.error('Slider Component: Fetch error', err);
      });
  }

  prev() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  next() {
    this.currentIndex = Math.min(this.items.length - 1, this.currentIndex + 1);
  }
}

