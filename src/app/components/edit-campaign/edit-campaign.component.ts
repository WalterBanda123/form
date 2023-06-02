import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css'],
})
export class EditCampaignComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snackbar: MatSnackBar,
    private location: Location,
    private activeRoute: ActivatedRoute
  ) {}

  selectedCampaign: any;
  goBack(): void {
    this.location.back();
  }

  editCampaignHandler(updates: NgForm) {
    const values = updates.value;

    console.log(values.campaign_name, values);

    const updatedValuesArr = [
      { propertyName: 'campaign_name', value: values.campaign_name },
      { propertyName: 'product', value: values.product },
      { propertyName: 'cost', value: values.cost },
      {
        propertyName: 'duration',
        value: {
          startDate: values.startDate,
          endDate: values.endDate,
        },
      },
      {
        propertyName: 'awareness',
        value: {
          impressions: values.impressions,
          reach: values.reach,
          clicks: values.clicks,
          phone_calls: values.phone_calls,
          meetings: values.meetings,
        },
      },
      {
        propertyName: 'interest',
        value: {
          demo: values.demo,
          signups: values.signups,
        },
      },
      {
        propertyName: 'engagement',
        value: {
          media_uploads: values.media_uploads,
          stakeholder_buy_in: values.stakeholder_buy_in,
          logins: values.logins,
        },
      },
      { propertyName: 'notes', value: values.notes },
      {
        propertyName: 'activation',
        value: {
          add_credit_card: values.add_credit_card,
          paid_pilot: values.paid_pilot,
          total_credits_purchased: values.total_credits_purchased,
          // cash_purchase: values.cash_purchase,
          // visa_purchase: values.visa_purchase,
          cash_purchase_amount: values.cash_purchase_amount,
          visa_purchase_amount: values.visa_purchase_amount,
        },
      },
    ];

    this.campaignService
      .updateCampaign(this.selectedCampaign._id, updatedValuesArr)
      .subscribe((response) => {
        this.snackbar.open(response.message, 'undo', {
          duration: 4000,
        });
        console.log(response.status);
      });
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.campaignService.getCampaign(id).subscribe((response) => {
      this.selectedCampaign = response.campaign;
    });
  }
}
