import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuyButton } from '../buy-button/buy-button';
import { products } from '../../db';
import { NgStyle } from '@angular/common';
import { Shadow } from '../../directives/shadow';
import { ZoomImage } from '../../directives/zoom-image';
import { ShortenPipe } from '../../pipes/shorten-pipe';
import { Router, RouterLink } from '@angular/router';
import { StaticData } from '../../services/static-data';

@Component({
  selector: 'app-product-card',
  imports: [BuyButton, NgStyle, Shadow, ZoomImage, ShortenPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product = products[0];
  @Input() totalValue = 0;
  @Output() buy = new EventEmitter<number>();
  @Input() renderFor: 'view' | 'edit' | 'delete' = 'view';
  isExpanded = false;

  constructor(
    private router: Router,
    private staticDataService: StaticData,
  ) {}

  buyProduct() {
    if (this.product.stock > 0) {
      this.product.stock--;
      this.totalValue += this.product.price;
      this.buy.emit(this.totalValue);
    } else {
      alert('Product is out of stock');
    }
  }

  updateProduct() {
    this.router.navigate(['/edit-product', this.product.id]);
  }

  deleteProduct() {
    this.staticDataService.deleteProduct(this.product.id);
    this.router.navigate(['/products']);
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }
}
