import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewer } from './products-viewer';

describe('ProductsViewer', () => {
  let component: ProductsViewer;
  let fixture: ComponentFixture<ProductsViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
