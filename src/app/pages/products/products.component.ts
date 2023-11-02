import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;

  constructor(
    private http: HttpClient,
    private productDetailService: ProductDetailService,
    private ordersService: OrdersService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productDetailService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  showProductDetails(product: any): void {
    this.productDetailService.openProductDetailDialog(product);
  }

  addToCart(orderId: string) {
    console.log(sessionStorage.getItem('user'));

    const userSession = sessionStorage.getItem('user');
    let userId;
    if (userSession != null) userId = JSON.parse(userSession).id;

    this.ordersService.addToCart(userId, orderId);
  }
}
