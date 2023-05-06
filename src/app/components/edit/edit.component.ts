import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) {}

  selectedStatus?: string;
  editCompanyHandler(updates: NgForm): void {
    const values = updates.value;

    const updatedValuesArr = [
      { propertyName: 'companyName', value: values.companyName },
      { propertyName: 'socialMediaLink', value: values.socialMediaLink },
      { propertyName: 'companyPhone', value: values.companyPhone },
      { propertyName: 'companyWebsite', value: values.companyWebsite },
      { propertyName: 'contactEmail', value: values.contactEmail },
      { propertyName: 'otherContact', value: values.otherContact },
      { propertyName: 'status', value: values.status },
    ];

    console.log(values.status);

    this.companyService
      .updateCompany(this.data._id, updatedValuesArr)
      .subscribe((response) => {
        console.log(response);
      });
  }

  selectedCompany: any;
  ngOnInit(): void {
    this.selectedCompany = this.data;
    if (this.data.status) {
      this.selectedStatus = this.data.status;
    }
  }
}
