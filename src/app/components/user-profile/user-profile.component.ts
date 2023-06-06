import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private location: Location, private authService: AuthService) {}

  currentPage: any;
  user: any;

  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('authenticatedUser')!);
    this.currentPage = localStorage.getItem('currentPage');
    this.authService.getUser(loggedUser?._id).subscribe((response) => {
      this.user = response.user;
    });
  }
}
