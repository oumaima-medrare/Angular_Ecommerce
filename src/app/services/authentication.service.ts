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
    return this.http.post('http://localhost:3000/users', user).subscribe(
      (result: any) => {
        if (result) {
          sessionStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/products']);
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Welcome ' + result.username,
            text: 'User is registered successfully',
          });
        }
      },
      (error) => {
        //error signup failed
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
    this.http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.username === data.username && a.password === data.password;
        });

        if (user) {
          sessionStorage.setItem('user', JSON.stringify(data.body));
          this.router.navigate(['/products']);
          Swal.fire({
            icon: 'success',
            title: 'Welcome ' + data.username,
            text: 'User is signed in successfully',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Uncorrect username or password',
          });
        }
      },
      (error) => {
        //error login failed
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
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
