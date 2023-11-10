import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  public user = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
    this.auth.userAuthReload();
  }

  login() {
    if (this.user.password == '' || this.user.username === '') {
      this.snack.open(
        'Please enter your password & your username and try again ',
        '',
        { duration: 3000 }
      );
      return;
    }
    this.auth.userLogin().subscribe(
      (res) => {
        const userfound = res.find((a: User) => {
          return (
            a.username === this.user.username &&
            a.password === this.user.password
          );
        });

        if (userfound) {
          //user found  in db
          sessionStorage.setItem('user', JSON.stringify(userfound));
          this.router.navigate(['/products']);
          Swal.fire({
            icon: 'success',
            title: 'Welcome ' + this.user.username,
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
}
