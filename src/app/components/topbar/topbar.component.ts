import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  user: any;
  signOutHandler(): void {
    localStorage.removeItem('authenticatedUser');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('authenticatedUser')!);
    this.authService.getUser(loggedUser._id).subscribe((userData) => {
      this.user = userData.user;
    });
  }
}
