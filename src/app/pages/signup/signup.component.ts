import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private auth: AuthenticationService) {}

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {
    this.auth.userAuthReload();
  }

  signUp() {
    this.auth.userSignUp(this.user);
  }
}
