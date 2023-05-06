import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.authService.getUsers().subscribe((users: any) => {
      const usersList = users.allUsers;
      this.newlyCreatedUser = usersList[users.allUsers.length - 1];
    });
  }

  newlyCreatedUser: any;

  ngOnInit(): void {

  }
}
