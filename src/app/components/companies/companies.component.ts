import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CompanyService } from 'src/app/company.service';
import { EditComponent } from '../edit/edit.component';
import { CallModalComponent } from '../call-modal/call-modal.component';
import { MeetingModalComponent } from '../meeting-modal/meeting-modal.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Company } from 'src/app/company';
import { log } from 'console';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private changeDection: ChangeDetectorRef,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  searchedValue?: string = '';
  dataSource?: any;
  companiesNotReached: any[] = [];
  companiesReached: any[] = [];
  companiesRejected: any[] = [];
  companiesOnFreeCreditsOnboarding: any[] = [];
  companieOnboarding: any[] = [];
  totalNumberOfCompanies: any;
  selectedMenuItem: string = 'all';
  microCompanies?: any[];
  midSizeCompanies?: any[];
  entepriseCompanies?: any[];
  searchedText = '';

  displayedColumns: string[] = [
    'companyName',
    'socialMediaLink',
    'companyPhone',
    'companyWebsite',
    'companySize',
    'status',
    'view',
    'call',
    'meeting',
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
      this.companyService.getCompanies().subscribe((data: any) => {
        this.dataSource = data.companies.reverse();
        this.changeDection.detectChanges();
        // console.log(`the result is :${result} and the data is ${data.companies} `);
      });
      console.log(result);
    });
  }

  selectionChange(event: any): void {
    this.selectedMenuItem = event.source.value;
  }

  selectionChangeHandler(event: any): void {
    this.selectedMenuItem = event.source.value;
    console.log(event.source.value);
    this.selectedMenuItem = event.source.value;
  }

  //-------FILTERING BASED ON COMPANIES REACHED----
  filterAll(): void {
    this.companyService.getCompanies().subscribe((companies: any) => {
      this.dataSource = companies.companies.reverse();
      this.changeDection.detectChanges();
    });
  }

  //-------FILTERING BASED ON COMPANIES REACHED----
  filterCompaniesReached(): void {
    const data = this.dataSource.filter(
      (company: any) =>
        company.status.toLowerCase().trim() === 'Reached'.toLowerCase().trim()
    );

    console.log(data);
    this.dataSource = data;
    this.changeDection.detectChanges();
  }

  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesNotReached(): void {
    const results = this.dataSource.filter(
      (company: any) =>
        company.status.toLowerCase().trim() ===
        'Not reached'.toLowerCase().trim()
    );

    this.dataSource = results;
    this.changeDection.detectChanges();
  }
  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesThatRejected(): void {
    const results = this.dataSource.filter(
      (company: any) =>
        company.status.toLowerCase().trim() === 'Rejected'.toLowerCase().trim()
    );
    this.dataSource = results;
    this.changeDection.detectChanges();
  }
  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesOnFreeCredit(): void {
    const results = this.dataSource.filter(
      (company: any) =>
        company.status.toLowerCase().trim() ===
        'Free credits onboarding'.toLowerCase().trim()
    );
    this.dataSource = results;
    this.changeDection.detectChanges();
  }
  //-------FILTERING BASED ON COMPANIES NOT REACHED----
  filterCompaniesOnboarding(): void {
    const results = this.dataSource.filter(
      (company: any) =>
        company.status.toLowerCase().trim() ===
        'Onboarding'.toLowerCase().trim()
    );
    this.dataSource = results;
    this.changeDection.detectChanges();
  }

  //---FILTERING MICRO COMPANIES----
  filterMicroCompanies(): void {
    this.companyService.filterBySize('Micro size').subscribe((result: any) => {
      this.dataSource = result.items;
      this.changeDection.detectChanges();
    });
  }

  //-- MID SIZE COMPANIES ----
  filterMidSizeCompanies(): void {
    this.companyService.filterBySize('Mid size').subscribe((result: any) => {
      this.dataSource = result.items;
      this.changeDection.detectChanges();
    });
  }

  //---FILTER ALL COMPANIES ----
  filterByAllSize(): void {
    this.companyService.getCompanies().subscribe((companies: any) => {
      this.dataSource = companies.companies.reverse();
      this.changeDection.detectChanges();
    });
  }

  //----FILTER ENTEPRICE COMPANIES ----
  filterEntepriseCompanies(): void {
    this.companyService.filterBySize('Enteprise').subscribe((result: any) => {
      this.dataSource = result.items;
      this.changeDection.detectChanges();
    });
  }

  implementSearching(): void {
    if (this.searchedText !== '') {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();

        this.companyService
          .searchImplementation(this.searchedText)
          .subscribe((data) => {
            this.dataSource = data.companies;
            this.changeDection.detectChanges();
          });
      }, 1000);
    }
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

  recurviveSearchHandler(currentArr: any[]): void {
    if (this.searchedValue !== '') {
      const filteredList = currentArr.filter(
        (company: any) =>
          company.companyName
            .trim()
            .toLowerCase()
            .includes(this.searchedValue?.toLowerCase().trim()) ||
          company.companyPhone
            .trim()
            .toLowerCase()
            .includes(this.searchedValue?.toLowerCase().trim()) ||
          company.contactEmail
            .trim()
            .toLowerCase()
            .includes(this.searchedValue?.toLowerCase().trim())
      );
      if (filteredList.length > 0) {
        this.dataSource = filteredList.reverse();
        this.changeDection.detectChanges();
      }
    }
    if (this.searchedValue === '') {
      this.dataSource = currentArr.reverse();
      this.changeDection.detectChanges();
    }
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

  editCompanyDetails(companyId: string): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate([`/edit-details/${companyId}`]);
    }, 1000);
  }

  scheduleMeeting(company: any): void {
    const dialogRef = this.dialog.open(MeetingModalComponent, {
      data: company,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  addCallNotes(company: any): void {
    const dialogRef = this.dialog.open(CallModalComponent, { data: company });
    dialogRef.afterClosed().subscribe((results) => {
      console.log(results);
    });
  }

  currentPage: any;
  navigateTo(page: string): void {
    this.currentPage = page;
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

    this.companyService.getCompanies().subscribe((data: any) => {
      const microCompaniesHere = data.companies.filter(
        (company: any) =>
          company.companySize.toLocaleLowerCase().trim() ===
          'Micro size'.toLocaleLowerCase().trim()
      );
      this.microCompanies = microCompaniesHere;

      const midSizeCompaniesHere = data.companies.filter(
        (company: any) =>
          company.companySize.toLocaleLowerCase().trim() ===
          'Mid size'.toLocaleLowerCase().trim()
      );

      this.midSizeCompanies = midSizeCompaniesHere;

      const entepriseCompaniesHere = data.companies.filter(
        (company: any) =>
          company.companySize.toLocaleLowerCase().trim() ===
          'Enteprise'.toLocaleLowerCase().trim()
      );

      this.entepriseCompanies = entepriseCompaniesHere;
    });

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
