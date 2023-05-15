import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router:Router
  ) {}


  navigateHandler(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    this.router.navigate(['/login'])

  }

  recentlyAddedUser: any;
  ngOnInit(): void {
    this.recentlyAddedUser = JSON.parse(
      localStorage.getItem('recentlyCreatedUserName')!
    );
  }
}
