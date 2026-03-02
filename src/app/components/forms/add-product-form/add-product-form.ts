import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../models/iproduct';
import { DynamicDataService } from '../../../services/dynamic-data-service';

@Component({
  selector: 'app-add-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product-form.html',
  styleUrl: './add-product-form.css',
})
export class AddProductForm implements OnInit {
  newProduct: IProduct = {} as IProduct;

  categories: string[] = [];

  constructor(
    private dynamicDataService: DynamicDataService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.dynamicDataService.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.cdr.detectChanges();
    });
  }

  onAddProduct() {
    console.log('Product added:', this.newProduct.title);
    this.dynamicDataService.addProduct(this.newProduct);
  }
}
