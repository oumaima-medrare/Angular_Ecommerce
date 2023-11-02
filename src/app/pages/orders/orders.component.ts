import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: any;
  ordersCount: Map<number, number> = new Map<number, number>();
  filteredProducts: Product[] = [];

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    const userSession = sessionStorage.getItem('user');
    let userId;
    if (userSession != null) userId = JSON.parse(userSession).id;

    this.orderService.getUser(userId).subscribe((user: User) => {
      const selectedIndexes: number[] = user.orders;
      this.ordersCount = this.countNumberOfOrder(selectedIndexes);
      console.log(this.ordersCount);

      this.orderService.getProducts().subscribe((data: Product[]) => {
        // Now you have the JSON data, and you can filter it based on ordersCount
        if (this.ordersCount.size > 0) {
          this.filteredProducts = data.filter((product) =>
            this.ordersCount.has(product.id)
          );
        }
        console.log(this.filteredProducts);
      });
    });
  }

  countNumberOfOrder(numbers: number[]): Map<number, number> {
    const counts = new Map<number, number>();
    for (const num of numbers) {
      if (counts.has(num)) {
        const currentCount = counts.get(num);
        if (currentCount !== undefined) {
          counts.set(num, currentCount + 1);
        } else {
          counts.set(num, 1);
        }
      } else {
        counts.set(num, 1);
      }
    }
    return counts;
  }
}
