import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: any) {
    return this.http.post('http://localhost:3000/users', user);
  }

  userLogin() {
    return this.http.get<any>('http://localhost:3000/users');
  }

  userAuthReload() {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['/products']);
    }
  }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('user')) return true;
    else return false;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/signup']);
  }
}
