import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  addCompanyHandler(details: NgForm): void {
    const values = details.value;
    if (values.companyName !== '') {
      const newCompany = {
        companyName: values.companyName,
        socialMediaLink: values.socialMediaLink,
        companyPhone: values.companyPhone,
        companyWebsite: values.companyWebsite,
        contactEmail: values.contactEmail,
        otherContact: values.otherContact,
        companySize:values.companySize
      };

      this.companyService.createCompany(newCompany).subscribe((res) => {
        console.log(res);
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
          this.snackBar.open(res.message, 'Okay', {
            duration: 1000,
          });
        }, 1000);
        // setTimeout(() => {

        // }, 1000);
      });
    }
  }
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
