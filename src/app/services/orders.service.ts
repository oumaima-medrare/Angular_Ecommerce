import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient, private snack: MatSnackBar) {}
  private productUrl = 'assets/products.json'; // Path to your JSON file.

  addToCart(userId: any, orderId: any) {
    this.http
      .get(`http://localhost:3000/users/${userId}`)
      .subscribe((user: any) => {
        user.orders.push(orderId);
        this.http.put(`http://localhost:3000/users/${userId}`, user).subscribe(
          (response: any) => {
            this.snack.open('Order added successfully', '', { duration: 3000 });
            console.log('User data updated:', response);
          },
          (err: any) => {
            this.snack.open('Error Adding Order', '', { duration: 3000 });
          }
        );
      });
  }

  getUser(userId: String) {
    return this.http.get<any>(`http://localhost:3000/users/${userId}`);
  }

  getProducts() {
    return this.http.get<Product[]>(this.productUrl);
  }
}
