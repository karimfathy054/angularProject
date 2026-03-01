import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticData } from '../../services/static-data';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private staticDataService: StaticData,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.product = this.staticDataService.getProductById(id);
  }
}
