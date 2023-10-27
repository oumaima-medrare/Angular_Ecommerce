import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetailService } from 'src/app/services/product-detail.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  gridColumns = 3;

  products: any; // You may want to define a product model class for type safety

  constructor(
    private http: HttpClient,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit(): void {
    this.http.get('assets/products.json').subscribe((data: any) => {
      this.products = data.products;
    });
  }

  showProductDetails(product: any): void {
    this.productDetailService.openProductDetailDialog(product);
  }
}
