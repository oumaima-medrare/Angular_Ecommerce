import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor() {}

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
}
