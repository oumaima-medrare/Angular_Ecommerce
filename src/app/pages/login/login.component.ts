import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AuthenticationService) {}

  public user = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
    this.auth.userAuthReload();
  }

  login() {
    this.auth.userLogin(this.user);
  }
}
