import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.userAuthReload();
  }

  signUp() {
    this.auth.userSignUp(this.user);
  }

  login(data: any) {
    this.auth.userLogin(data);
    this.auth.invalidUserAuth.subscribe((result) => {
      console.warn(result);
      if (result) {
        this.authError = 'User not found';
      }
    });
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
