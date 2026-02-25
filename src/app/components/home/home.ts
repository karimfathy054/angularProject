import { Component } from '@angular/core';
import { Slider } from "../slider/slider";

import { ProductsViewer } from "../products-viewer/products-viewer";

@Component({
  selector: 'app-home',
  imports: [Slider, ProductsViewer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
