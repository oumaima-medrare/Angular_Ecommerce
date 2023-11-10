import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsGuard implements CanActivate {
  constructor(private router: Router, private usersService: UsersService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = next.paramMap.get('id');
    // Use the userService to fetch user data by ID
    return this.usersService.getUserById(userId).pipe(
      map((user) => {
        if (user) {
          // User with the specified ID exists, allow access to the route
          return true;
        } else {
          // User does not exist, you can handle this situation as needed
          // For example, redirect to an error page or another route
          return this.router.parseUrl('/users');
        }
      }),
      catchError(() => {
        // Handle any error that occurs during the HTTP request (e.g., network error)
        // You can redirect to an error page or another route in this case
        return of(this.router.parseUrl('/users')); // Return an observable with the UrlTree
      })
    );
  }
}
