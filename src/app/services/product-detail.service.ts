import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(private http: HttpClient) {}
  private productUrl = 'assets/products.json';

  getProducts() {
    return this.http.get<Product[]>(this.productUrl);
  }
}
