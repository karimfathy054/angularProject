import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { DynamicDataService } from '../../services/dynamic-data-service';

@Component({
  selector: 'app-products-viewer',
  imports: [ProductCard, FormsModule, DecimalPipe],
  templateUrl: './products-viewer.html',
  styleUrl: './products-viewer.css',
})
export class ProductsViewer {
  buttonFunctionality = () => {};
  allProducts: IProduct[] = [];
  categories: string[] = [];
  totalValue: number = 0;
  searchQuery: string = '';
  priceRangeMin: number = 0;
  priceRangeMax: number = 0;
  private readonly pageSize: number = 30;
  private pageNumber: number = 1;
  priceRange: number = 0;
  category: string = 'all';
  asc: boolean = true;
  sortSelect: string = 'default';
  @Input() renderFor: 'view' | 'edit' | 'delete' = 'view';

  constructor(
    private dynamicDataService: DynamicDataService,
    private cdr: ChangeDetectorRef,
  ) {
    let max = 0;
    let min = 0;
    this.dynamicDataService.getProductsPriceRange().subscribe((res: any) => {
      console.log(res);
      max = res.max;
      min = res.min;
      this.setPriceRange(min, max);
      this.cdr.detectChanges();
    });
  }
  setPriceRange(min: number, max: number) {
    this.priceRangeMax = max;
    this.priceRangeMin = min;
    this.priceRange = this.priceRangeMax;
  }

  ngOnInit() {
    this.dynamicDataService.getProducts(this.pageSize, this.pageNumber).subscribe((res: any) => {
      console.log(res);
      this.allProducts = res['data'];
      this.cdr.detectChanges();
    });
    this.dynamicDataService.getCategories().subscribe((res: any) => {
      console.log(res);

      this.categories = res.map((category: any) => category.name);
      this.cdr.detectChanges();
    });
  }

  updateTotalValue(value: unknown) {
    this.totalValue = value as number;
  }

  filterProducts() {
    this.dynamicDataService
      .getProductsFiltered(
        this.pageNumber,
        this.pageSize,
        this.searchQuery,
        this.category,
        this.priceRange,
      )
      .subscribe((res: any) => {
        this.allProducts = res['data'];
        this.cdr.detectChanges();
      });
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
