import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private campaignService: CampaignService
  ) {}

  campaignSelected: any;
  ngOnInit(): void {
    console.log(this.data);

    this.campaignService.getCampaign(this.data.id).subscribe((response) => {
      console.log(response.campaign);
      this.campaignSelected = response.campaign;
    });
  }
}
