import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../models/iproduct';
import { StaticData } from '../../../services/static-data';
import { categories } from '../../../db';

@Component({
  selector: 'app-add-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product-form.html',
  styleUrl: './add-product-form.css',
})
export class AddProductForm {
  newProduct: IProduct = {} as IProduct;

  categories: string[] = categories;

  constructor(private staticDataService: StaticData) {}

  onAddProduct() {
    console.log('Product added:', this.newProduct.title);
    this.staticDataService.addProduct(this.newProduct);
  }
}
