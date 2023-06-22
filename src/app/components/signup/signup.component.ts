import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
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
  ) {
    console.log(this.passwordsDoNotMatch);
  }

  passwordsDoNotMatch = false;
  authError: string = '';

  checkPasswords(pass1: string, pass2: string) {
    if (pass1 !== pass2) {
      this.passwordsDoNotMatch = true;
      console.log(this.passwordsDoNotMatch);
    }

    if (pass1 === pass2) {
      console.log('This matches');
      this.passwordsDoNotMatch = false;
    }
  }
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

      this.authService.userSignUp(newUser).subscribe(
        (response) => {
          if (response.user.email) {
            console.log(response);
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
        },
        (error: any) => {
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
          setTimeout(() => {
            this.authError = error.error.message;
          }, 2000);
        }
      );
    } else {
      if (
        details.confirmPassword !== '' &&
        details.password !== '' &&
        details.confirmPassword !== details.password
      ) {
        this.passwordsDoNotMatch = true;
      }
    }
  }
  ngOnInit(): void {}
}
