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

  getLastPageCredentials(form: NgForm): void {
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
}
