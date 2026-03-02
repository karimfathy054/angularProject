import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { IUser } from '../models/iuser';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicDataService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getProducts(limit: number, pageNumber: number) {
    return this.http.get(`${this.baseUrl}/products?_page=${pageNumber}&_per_page=${limit}`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/products?id=${id}`);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getCategories() {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  addProduct(product: IProduct) {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: IProduct) {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  getProductsFiltered(
    pageNumber: number,
    limit: number,
    productTitle: string,
    category: string,
    priceRange: number,
  ) {
    if (category == 'all') {
      category = '';
    }
    return this.http.get(
      `${this.baseUrl}/products?_page=${pageNumber}&_per_page=${limit}&title=${productTitle}&category=${category}&price:lte=${priceRange}`,
    );
  }

  getProductsPriceRange() {
    return this.http.get(`${this.baseUrl}/products`).pipe(
      map((res: any) => {
        return {
          max: Math.max(...res.map((product: IProduct) => product.price)),
          min: Math.min(...res.map((product: IProduct) => product.price)),
        };
      }),
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  addUser(user: IUser) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  addCategory(category: string) {
    return this.http.post(`${this.baseUrl}/categories`, category);
  }

  updateCategory(id: number, category: string) {
    return this.http.put(`${this.baseUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }
}
