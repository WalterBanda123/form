import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CompanyService } from './company.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form';

  showSpinner = false;

  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn: any;
  loggedUser: any;
  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('authenticatedUser')!);
    console.log(this.loggedUser);

    this.authService._isUserLogged.subscribe((state: any) => {
      this.isLoggedIn = state;
      console.log(state);

    });
  }
}
