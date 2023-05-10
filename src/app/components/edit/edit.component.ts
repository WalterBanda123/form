import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/company.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private companyService: CompanyService,
    private location: Location,
    private snackbar: MatSnackBar
  ) {}

  data: any;
  selectedStatus?: string;
  selectedCompanyDate: any;
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
      { propertyName: 'notes', value: values.notes },
      {
        propertyName: 'meetingDate',
        value: new Date(values.meetingDate).toDateString(),
      },
      { propertyName: 'meetingTime', value: values.meetingTime },
    ];

    console.log(values.status);

    this.companyService
      .updateCompany(this.selectedCompany._id, updatedValuesArr)
      .subscribe((response) => {
        this.snackbar.open(response.message, 'undo', {
          duration: 4000,
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  selectedCompany: any;
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.companyService.getCompany(id).subscribe((data: any) => {
      this.selectedCompanyDate = new Date(
        data.company.meetingDate
      ).toLocaleDateString('en-US');

      this.selectedCompany = data.company;
    });
  }
}
