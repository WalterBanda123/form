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
  }
  ngOnInit() {
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
  }
}
