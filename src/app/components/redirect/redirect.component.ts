import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  constructor(private authService: AuthService) {}

  recentlyAddedUser: any;
  ngOnInit(): void {
    this.recentlyAddedUser = JSON.parse(
      localStorage.getItem('recentlyCreatedUserName')!
    );
  }
}
