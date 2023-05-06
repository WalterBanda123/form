import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CompanyService } from 'src/app/company.service';
import { EditComponent } from '../edit/edit.component';

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
  companiesNotReached: any[] = [];
  companiesReached: any[] = [];
  companiesRejected: any[] = [];
  companiesOnFreeCreditsOnboarding: any[] = [];
  companieOnboarding: any[] = [];
  totalNumberOfCompanies: any;
  selectedMenuItem:string = 'all';


  displayedColumns: string[] = [
    'companyName',
    'socialMediaLink',
    'companyPhone',
    'companyWebsite',
    'contactEmail',
    'status',
    'edit',
    'delete',
  ];

  menuItem: string[] = [
    'Not reached',
    'Reached',
    'Rejected',
    'Free credits onboarding',
    'Onboarding',
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

  //-------FILTERING BASED ON COMPANIES REACHED----
  filterCompaniesReached(item:any): void {
    this.dataSource = this.companiesReached;
    this.changeDection.detectChanges();
    this.selectedMenuItem = item
  }

  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesNotReached(): void {
    this.dataSource = this.companiesNotReached;
    this.changeDection.detectChanges();
  }
  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesThatRejected(): void {
    this.dataSource = this.companiesRejected;
    this.changeDection.detectChanges();
  }
  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesOnFreeCredit(): void {
    this.dataSource = this.companiesOnFreeCreditsOnboarding;
    this.changeDection.detectChanges();
  }
  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesOnboarding(): void {
    this.dataSource = this.companieOnboarding;
    this.changeDection.detectChanges();
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

  onMenuOpened(): void {
    setTimeout(() => {
      console.log(this.selectedMenuItem);
    });
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((companies: any) => {
      this.dataSource = companies.companies.reverse();
      this.totalNumberOfCompanies = companies.companies;
      const term = 'Not reached';
      companies.companies.forEach((company: any) => {
        if (
          company.status.toLocaleLowerCase().trim() ===
          term.toString().toLocaleLowerCase().trim()
        ) {
          this.companiesNotReached?.push(company);
        } else if (
          company.status.toLocaleLowerCase().trim() ===
          'Reached'.toString().toLocaleLowerCase().trim()
        ) {
          this.companiesReached.push(company);
        } else if (
          company.status.toLocaleLowerCase().trim() ===
          'Free credits onboarding'.toString().toLocaleLowerCase().trim()
        ) {
          this.companiesOnFreeCreditsOnboarding.push(company);
        } else if (
          company.status.toLocaleLowerCase().trim() ===
          'Onboarding'.toString().toLocaleLowerCase().trim()
        ) {
          this.companieOnboarding.push(company);
        } else if (
          company.status.toLocaleLowerCase().trim() ===
          'Rejected'.toString().toLocaleLowerCase().trim()
        ) {
          this.companiesRejected.push(company);
        } else {
          console.log('Not a valid status');
        }
      });
    });
  }
}
