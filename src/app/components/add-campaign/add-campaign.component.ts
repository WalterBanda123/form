import { Location } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css'],
})
export class AddCampaignComponent {
  @ViewChild('page1') page1Template!: TemplateRef<any>; // Reference to the ng-template for Page 1
  @ViewChild('page2') page2Template!: TemplateRef<any>;
  @ViewChild('page3') page3Template!: TemplateRef<any>;
  @ViewChild('page4') page4Template!: TemplateRef<any>;

  currentPage: number = 0;
  arrForDetails: any = [];

  constructor(
    // private dialogRef: MatDialogRef<AddCampaignComponent>,
    private campaignService: CampaignService,
    private spinner: NgxSpinnerService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  // get currentPageTemplate(): TemplateRef<any> {
  //   switch (this.currentPage) {
  //     case 0:
  //       return this.page1Template;
  //     case 1:
  //       return this.page2Template;
  //     case 2:
  //       return this.page3Template;
  //     case 3:
  //       return this.page4Template;
  //     // Add more cases for additional pages
  //     default:
  //       return this.page1Template;
  //   }
  // }

  // nextPage() {
  //   // Implement your logic to handle the next page navigation
  //   if (this.currentPage < this.getTotalPages() - 1) {
  //     this.currentPage++;
  //   }
  // }

  // previousPage() {
  //   // Implement your logic to handle the previous page navigation
  //   if (this.currentPage > 0) {
  //     this.currentPage--;
  //   }
  // }

  // // closeDialog() {
  // //   this.dialogRef.close();
  // // }

  // getTotalPages(): number {
  //   // Replace this with your own logic to determine the total number of pages
  //   return 4; // Example: 2 pages
  // }

  // getInitialPageCredentials(initialCredentials: NgForm): void {
  //   this.arrForDetails.push(initialCredentials.value);
  //   console.log(initialCredentials.value);
  // }
  // getFirstPageCredentials(initialPageDetails: NgForm): void {
  //   this.arrForDetails.push(initialPageDetails.value);
  //   console.log(initialPageDetails.value);
  // }
  // getSecondPageCredentials(initialPageDetails: NgForm): void {
  //   this.arrForDetails.push(initialPageDetails.value);
  //   console.log(initialPageDetails.value);
  // }

  getLastPageCredentials(form: NgForm): void {
    // this.arrForDetails.push(secondPageDetails.value);
    // console.log(this.arrForDetails);
    // const entity = {
    //   ...this.arrForDetails[0],
    //   ...this.arrForDetails[1],
    //   ...this.arrForDetails[2],
    //   ...this.arrForDetails[3]
    // };

    this.spinner.show();
    setTimeout(() => {
      this.campaignService.createCampaign(form.value).subscribe((response) => {
        this.snackbar.open('Campaign was added successfully', 'Okay', {
          duration: 4000,
        });
        console.log(response.campaign);
      });
      this.spinner.hide();
    }, 1000);

    console.log(form.value);
  }

  goBack(): void {
    this.location.back();
  }

  // saveCampaign(newCampaign: NgForm): void {}
}
