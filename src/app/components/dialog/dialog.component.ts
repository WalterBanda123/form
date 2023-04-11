import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(private companyService: CompanyService, private snackBar:MatSnackBar) {}

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
        };

        this.companyService.createCompany(newCompany).subscribe((res) => {
          console.log(res);
          this.snackBar.open(res.message, 'Undo', {
            duration:4000
          })
        });


      }


    }
  }

