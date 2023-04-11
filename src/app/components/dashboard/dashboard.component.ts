import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CompanyService } from 'src/app/company.service';
import { EditComponent } from '../edit/edit.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private changeDection: ChangeDetectorRef
  ) {}

  searchedValue?: string = '';
  dataSource?: any;
  displayedColumns: string[] = [
    'companyName',
    'socialMediaLink',
    'companyPhone',
    'companyWebsite',
    'contactEmail',
    'otherContacts',
    'edit',
    'delete',
  ];

  startAddingCompany() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.companyService.getCompanies().subscribe((data: any) => {
          this.dataSource = data.companies.reverse();
          // console.log(`the result is :${result} and the data is ${data.companies} `);
        });
      }
      console.log(result);
    });
  }

  searchHandler(): void {
    this.companyService.getCompanies().subscribe((result: any) => {
      if (this.searchedValue !== '') {
        const filteredList = result.companies.filter(
          (company: any) =>
            company.companyName
              .trim()
              .toLowerCase()
              .includes(this.searchedValue?.trim().toLowerCase()) ||
            company.companyPhone
              .trim()
              .toLowerCase()
              .includes(this.searchedValue?.trim().toLowerCase()) ||
            company.contactEmail
              .trim()
              .toLowerCase()
              .includes(this.searchedValue?.trim().toLowerCase())
        );
        if (filteredList.length > 0) {
          this.dataSource = filteredList.reverse();
        }
      }
      if (this.searchedValue === '') {
        this.dataSource = result.companies.reverse();
      }
    });
  }

  deleteCompanyRecord(companyId: string): void {
    this.companyService.deleteCompany(companyId).subscribe((result) => {
      console.log(result);
      const newArr = this.dataSource?.filter(
        (item: any) => item._id !== companyId
      );
      this.dataSource = newArr;
      this.changeDection.detectChanges();
    });
  }

  editCompanyDetails(company: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: company,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((companies: any) => {
      this.dataSource = companies.companies.reverse();
    });
  }
}
