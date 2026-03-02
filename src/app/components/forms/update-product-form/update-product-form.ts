import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { DynamicDataService } from '../../../services/dynamic-data-service';

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
    private dynamicDataService: DynamicDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dynamicDataService
      .getProductById(+this.activeRoute.snapshot.params['id'])
      .subscribe((res: any) => {
        this.product = res[0];
        this.cdr.detectChanges();
      });
    this.dynamicDataService.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    this.dynamicDataService.updateProduct(this.product.id, this.product).subscribe({
      next: (res) => {
        console.log(res);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.cdr.detectChanges();
      },
    });
  }
}
