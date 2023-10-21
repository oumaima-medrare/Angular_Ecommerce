import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

//import { login, signUp } from '../models/data-type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: any) {
    return this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe(
        (result: any) => {
          if (result) {
            localStorage.setItem('user', JSON.stringify(result.body));
            this.router.navigate(['/']);
            console.log(result);
            Swal.fire({
              icon: 'success',
              title: 'Welcome ' + result.username,
              text: 'User is registered successfully',
            });
          }
        },
        (error) => {
          //error
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }
  userLogin(data: any) {
    this.http
      .get<any[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
