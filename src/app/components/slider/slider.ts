import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { NgClass } from '@angular/common';
import { DynamicDataService } from '../../services/dynamic-data-service';

@Component({
  selector: 'app-slider',
  imports: [NgClass],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider implements OnInit {
  items: IProduct[] = [];
  currentIndex: number = 0;

  constructor(
    private dynamicDataService: DynamicDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.dynamicDataService.getProducts(5, 1).subscribe((res: any) => {
      this.items = res['data'];
      this.cdr.detectChanges();
    });
  }

  prev() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  next() {
    this.currentIndex = Math.min(this.items.length - 1, this.currentIndex + 1);
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
