import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  passwordsDoNotMatch: string = '';

  signUpUser(credentials: NgForm): void {
    const details = credentials.value;
    if (
      details.confirmPassword === details.password &&
      details.confirmPassword.length !== '' &&
      details.password !== '' &&
      details.email !== '' &&
      details.fullName !== ''
    ) {
      const newUser = {
        fullName: details.fullName,
        email: details.email,
        password: details.password,
      };

      console.log('new user created', newUser);
      this.authService.userSignUp(newUser).subscribe((response) => {
        if (response.user) {
          localStorage.setItem(
            'recentlyCreatedUserName',
            JSON.stringify(response.user.fullName)
          );
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
          setTimeout(() => {
            this.router.navigate(['/redirect'], { state: response.user });
          }, 2000);
        }
      });
    } else {
      if (
        details.confirmPassword !== '' &&
        details.password !== '' &&
        details.confirmPassword !== details.password
      ) {
        this.passwordsDoNotMatch = 'Passwords do not match';
        console.log(this.passwordsDoNotMatch);
      } else {
        console.log('passwords do not match');
        // this.router.navigate(['/redirect']);
      }
    }
  }
  ngOnInit(): void {}
}
