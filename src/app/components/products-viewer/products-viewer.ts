import { Component, Input } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { categories } from '../../db';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { StaticData } from '../../services/static-data';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-products-viewer',
  imports: [ProductCard, FormsModule, DecimalPipe],
  templateUrl: './products-viewer.html',
  styleUrl: './products-viewer.css',
})
export class ProductsViewer {
  buttonFunctionality = () => {};
  allProducts: IProduct[] = [];
  categories: string[] = categories;
  totalValue: number = 0;
  searchQuery: string = '';
  readonly priceRangeMin: number;
  readonly priceRangeMax: number;
  private readonly pageSize: number = 30;
  private pageNumber: number = 0;
  priceRange: number;
  category: string = 'all';
  asc: boolean = true;
  @Input() renderFor: 'view' | 'edit' | 'delete' = 'view';

  constructor(private staticDataService: StaticData) {
    const { max, min } = this.staticDataService.getProductsPriceRange();
    this.priceRangeMax = max;
    this.priceRangeMin = min;
    this.priceRange = this.priceRangeMax;
  }

  ngOnInit() {
    this.allProducts = this.staticDataService.getProducts(
      this.pageSize,
      this.pageNumber * this.pageSize,
    );
  }

  updateTotalValue(value: unknown) {
    this.totalValue = value as number;
  }

  filterProducts() {
    this.allProducts = this.staticDataService.getProductsFiltered(
      this.pageSize,
      this.pageNumber * this.pageSize,
      this.searchQuery,
      this.category,
      this.priceRange,
    );
  }
  sortBy(sortBy: string) {
    switch (sortBy) {
      case 'price':
        this.allProducts.sort((a, b) => (this.asc ? a.price - b.price : b.price - a.price));
        break;
      case 'name':
        this.allProducts.sort((a, b) =>
          this.asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
        );
        break;
      case 'rating':
        this.allProducts.sort((a, b) => (this.asc ? a.rating - b.rating : b.rating - a.rating));
        break;
      case 'stock':
        this.allProducts.sort((a, b) => (this.asc ? a.stock - b.stock : b.stock - a.stock));
        break;
      case 'discount':
        this.allProducts.sort((a, b) =>
          this.asc
            ? a.discountPercentage - b.discountPercentage
            : b.discountPercentage - a.discountPercentage,
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
