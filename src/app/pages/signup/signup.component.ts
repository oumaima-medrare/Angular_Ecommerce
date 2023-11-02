import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { format } from 'date-fns';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  maxDate = new Date();

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    phone: '',
    birthday: '',
  };

  ngOnInit(): void {
    this.auth.userAuthReload();
  }

  dateChanged(newDate: any) {
    const dateObject = new Date(newDate); // Create a Date object
    this.user.birthday = format(dateObject, 'yyyy-MM-dd'); // Format the date as "YYYY-MM-DD"
  }

  signUp() {
    if (this.user.password == '' || this.user.username === '') {
      this.snack.open(
        'Please enter your password & your username and try again ',
        '',
        { duration: 3000 }
      );
      return;
    }
    this.auth.userSignUp(this.user).subscribe(
      (result: any) => {
        if (result) {
          //console.log(result);
          sessionStorage.setItem('user', JSON.stringify(result));
          this.router.navigate(['/products']);
          console.log(sessionStorage.getItem('user'));
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
}
