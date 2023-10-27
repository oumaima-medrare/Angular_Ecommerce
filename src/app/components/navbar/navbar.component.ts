import { Component } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private auth: AuthenticationService) {
    router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent
        )
      )
      .subscribe((e: RouterEvent) => {
        this.isLoggedin = this.auth.isLoggedIn();
      });
  }

  name = 'Angular';
  public isCollapsed = true;
  isLoggedin?: boolean;

  ngonInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLoggedin = this.auth.isLoggedIn();
      }
    });
  }

  logout() {
    this.isLoggedin = false;
    this.auth.logout();
  }
}
