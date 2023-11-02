import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(private http: HttpClient) {}
  private productUrl = 'assets/products.json'; // Path to your JSON file.

  openProductDetailDialog(product: any): void {
    Swal.fire({
      title: product.name,
      text: product.description,
      imageUrl: product.link,
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: 'product image',
      confirmButtonColor: '#c2185b',
    });
  }

  getProducts() {
    return this.http.get<Product[]>(this.productUrl);
  }
}
