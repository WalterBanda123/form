import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  authError: string = '';
  signInHandler(credentials: NgForm): void {
    if (credentials.valid) {
      const inputs = credentials.value;
      const userCredentials = {
        email: inputs.email,
        password: inputs.password,
      };

      this.authService.userSignIn(userCredentials).subscribe(
        (data: any) => {
          if (data.token) {
            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 2000);
            setTimeout(() => {
              localStorage.setItem('authenticatedUser', JSON.stringify(data));
              // this.authService.getLoggedUser(data.token);
              this.authService.isLoggedIn = true;
              this.router.navigate(['/dashboard']);
            }, 2000);
          }
        },
        (error: any) => {
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
          setTimeout(() => {
            this.authError =
              'Authentication failed. Wrong user email or password';
          }, 2000);
          // if (error.status === 401 && error.statusText === 'Unauthorized') {}
        }
      );
    }
  }

  ngOnInit(): void {
    const userLoggedIn = JSON.parse(localStorage.getItem('authenticatedUser')!);
    // console.log(userLoggedIn);
    // localStorage.removeItem('authenticatedUser');
  }
}
