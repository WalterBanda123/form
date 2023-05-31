import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css'],
})
export class AddCampaignComponent {
  @ViewChild('page1') page1Template!: TemplateRef<any>; // Reference to the ng-template for Page 1
  @ViewChild('page2') page2Template!: TemplateRef<any>;

  currentPage: number = 0;
  arrForDetails: any = [];

  constructor(
    private dialogRef: MatDialogRef<AddCampaignComponent>,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {}

  get currentPageTemplate(): TemplateRef<any> {
    switch (this.currentPage) {
      case 0:
        return this.page1Template;
      case 1:
        return this.page2Template;
      // Add more cases for additional pages
      default:
        return this.page1Template;
    }
  }

  nextPage() {
    // Implement your logic to handle the next page navigation
    if (this.currentPage < this.getTotalPages() - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    // Implement your logic to handle the previous page navigation
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getTotalPages(): number {
    // Replace this with your own logic to determine the total number of pages
    return 2; // Example: 2 pages
  }

  getFirstPageCredentials(initialPageDetails: NgForm): void {
 

    this.arrForDetails.push(initialPageDetails.value);
    console.log(initialPageDetails.value);
  }

  getSecondPageCredentials(secondPageDetails: NgForm): void {

    this.arrForDetails.push(secondPageDetails.value);
    console.log(this.arrForDetails);
    const entity = { ...this.arrForDetails[0], ...this.arrForDetails[1] };

    this.campaignService.createCampaign(entity).subscribe((response) => {
      console.log(response.message);
      console.log(response.campaign);
    });
    console.log(entity);
  }

  // saveCampaign(newCampaign: NgForm): void {}
}
