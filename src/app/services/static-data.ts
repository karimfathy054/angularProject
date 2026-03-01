import { Injectable } from '@angular/core';
import { categories, products } from '../db';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class StaticData {
  private allProducts: IProduct[] = products;
  categories: string[] = categories;

  getProducts(limit: number, skip: number): IProduct[] {
    return this.allProducts.slice(skip, skip + limit);
  }

  getProductById(id: number): IProduct {
    return this.allProducts.find((product: IProduct) => product.id == id) as IProduct;
  }

  addProduct(product: IProduct): void {
    this.allProducts.unshift(product);
  }

  updateProduct(product: IProduct): void {
    const index = this.allProducts.findIndex((p: IProduct) => p.id == product.id);
    this.allProducts[index] = product;
  }

  deleteProduct(id: number): void {
    this.allProducts = this.allProducts.filter((product: IProduct) => product.id != id);
  }
  getProductsFiltered(
    limit: number,
    skip: number,
    productTitle: string,
    category: string,
    priceRange: number,
  ): IProduct[] {
    return this.allProducts
      .filter((product: IProduct) => product.price <= priceRange)
      .filter((product: IProduct) => product.category == category || category == 'all')
      .filter((product: IProduct) =>
        product.title.toLowerCase().includes(productTitle.toLowerCase()),
      )
      .slice(skip, skip + limit);
  }
  getProductsPriceRange(): { max: number; min: number } {
    return {
      max: Math.max(...this.allProducts.map((product: IProduct) => product.price)),
      min: Math.min(...this.allProducts.map((product: IProduct) => product.price)),
    };
  }
}
