import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticData } from '../../../services/static-data';
import { IProduct } from '../../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-update-product-form',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './update-product-form.html',
  styleUrl: './update-product-form.css',
})
export class UpdateProductForm {
  product!: IProduct;
  categories: string[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private staticDataService: StaticData,
  ) {}

  ngOnInit(): void {
    this.product = this.staticDataService.getProductById(+this.activeRoute.snapshot.params['id']);
    this.categories = this.staticDataService.categories;
  }

  onSubmit(): void {
    this.staticDataService.updateProduct(this.product);
  }
}
