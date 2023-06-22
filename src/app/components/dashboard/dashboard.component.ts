import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService  ) {
    this.currentPage = localStorage.getItem('currentPage') || 'campaigns';
  }

  currentPage: any = 'campaigns';
  navigateTo(page: string): void {
    this.currentPage = page;
    localStorage.setItem('currentPage', this.currentPage);
  }

  ngOnInit(): void {
    this.spinner.show();

    // this.currentPage = 'campaigns'
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
