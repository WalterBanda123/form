import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Company } from 'src/app/company';
import { CompanyService } from 'src/app/company.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private changeDection: ChangeDetectorRef
  ) {}

  companies?: Company[];
  displayedColumns: string[] = [
    'companyName',
    'socialMediaLink',
    'companyPhone',
    'companyWebsite',
    'contactEmail',
    'otherContacts',
  ];

  companiesList?:any = [
    {
      companyName: 'ZIMNAT',
      companyPhone: '78980000-',
      companyWebsite: 'www.zimnat.co.zw',
      contactEmail: '',
      otherContact: '',
      socialMediaLink: 'https://www.facebook.com/batazim/?mibextid=LQQJ4d'},
  ];

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((companies: any) => {
      this.companies = companies.companies.reverse();
      this.changeDection.detectChanges();
      console.log(companies);
      console.log(companies.companies);
    });
  }
}
