import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  currentPage: any = 'campaigns';
  isLoggedIn: boolean = false;
  navigateTo(page: string): void {
    this.currentPage = page;
    // this.currentPage = this.route.snapshot.url[0].path;
  }
  ngOnInit() {
    this.spinner.show();
    console.log(
      this.authService._isUserLogged.subscribe((value) => {
        console.log(value);
        this.isLoggedIn = value;
      })
    );

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
