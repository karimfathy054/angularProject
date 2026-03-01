import { Component } from '@angular/core';
import { ProductsViewer } from '../products-viewer/products-viewer';

@Component({
  selector: 'app-delete-product',
  imports: [ProductsViewer],
  templateUrl: './delete-product.html',
  styleUrl: './delete-product.css',
})
export class DeleteProduct {}
