import { Component } from '@angular/core';
import { ProductsViewer } from '../products-viewer/products-viewer';

@Component({
  selector: 'app-edit-product',
  imports: [ProductsViewer],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {}
