import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company.service';

@Component({
  selector: 'app-call-modal',
  templateUrl: './call-modal.component.html',
  styleUrls: ['./call-modal.component.css'],
})
export class CallModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) {}

  editCallDetails(updates: NgForm): void {
    const values = updates.value;
    const updatedValuesArr = [
      { propertyName: 'status', value: values.status },
      { propertyName: 'notes', value: values.notes },
    ];

    this.companyService
      .updateCompany(this.data._id, updatedValuesArr)
      .subscribe((response) => {
        console.log(response);
      });
  }
  selectedCompany: any;
  ngOnInit(): void {
    this.selectedCompany = this.data;
  }
}
