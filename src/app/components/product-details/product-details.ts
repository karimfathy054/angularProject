import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { DynamicDataService } from '../../services/dynamic-data-service';

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
    private dynamicDataService: DynamicDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dynamicDataService.getProductById(id).subscribe((res: any) => {
      this.product = res[0];
      this.cdr.detectChanges();
    });
  }
}
