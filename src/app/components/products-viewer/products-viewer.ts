import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { products, categories } from '../../db';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products-viewer',
  imports: [ProductCard, FormsModule, DecimalPipe],
  templateUrl: './products-viewer.html',
  styleUrl: './products-viewer.css',
})
export class ProductsViewer {
  private readonly allProducts = products;
  currProducts = [...products];
  categories: string[] = categories;
  totalValue: number = 0;
  searchQuery: string = '';
  readonly priceRangeMin: number;
  readonly priceRangeMax: number;
  priceRange: number;
  category: string = 'all';
  asc: boolean = true;

  constructor() {
    this.priceRangeMax = Math.max(...products.map((product) => product.price));
    this.priceRangeMin = Math.min(...products.map((product) => product.price));

    this.priceRange = this.priceRangeMax;
  }

  updateTotalValue(value: unknown) {
    this.totalValue = value as number;
  }

  filterProducts() {
    this.currProducts = this.allProducts
      .filter((product) => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .filter((product) => product.price <= this.priceRange)
      .filter((product) => this.category === 'all' || product.category === this.category);
  }
  sortBy(sortBy: string) {
    switch (sortBy) {
      case 'price':
        this.currProducts.sort((a, b) => (this.asc ? a.price - b.price : b.price - a.price));
        break;
      case 'name':
        this.currProducts.sort((a, b) =>
          this.asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
        );
        break;
      case 'rating':
        this.currProducts.sort((a, b) => (this.asc ? a.rating - b.rating : b.rating - a.rating));
        break;
      case 'stock':
        this.currProducts.sort((a, b) => (this.asc ? a.stock - b.stock : b.stock - a.stock));
        break;
      case 'discount':
        this.currProducts.sort((a, b) =>
          this.asc ? a.discount - b.discount : b.discount - a.discount,
        );
        break;
      case 'default':
        this.filterProducts();
        break;
      default:
        break;
    }
  }
}
