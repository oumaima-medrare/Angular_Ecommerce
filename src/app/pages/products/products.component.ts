import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Product } from 'src/app/models/product';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productDetailService: ProductDetailService,
    private ordersService: OrdersService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productDetailService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  showProductDetails(product: Product): void {
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

  addToCart(orderId: number) {
    console.log(sessionStorage.getItem('user'));

    const userSession = sessionStorage.getItem('user');
    let userId;
    if (userSession != null) {
      userId = JSON.parse(userSession).id;
      this.ordersService.addToCart(userId, orderId);
    } else {
      this.snack.open('Please login to order', '', { duration: 3000 });
      return;
    }
  }
}
