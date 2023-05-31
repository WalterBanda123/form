import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddCampaignComponent } from '../add-campaign/add-campaign.component';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],

})
export class CampaignsComponent implements OnInit {
  constructor(
    private changeDetection: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private campaignService: CampaignService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  isAddingCampaign: boolean = false;
  campaignsList: any = [];

  dataSource = new MatTableDataSource<any>(this.campaignsList);
  startAddingCampaign(): void {
    setTimeout(() => {
      this.spinner.show();
    }, 500);
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    const dialogRef = this.dialog.open(AddCampaignComponent);

    // this.router.navigateByUrl('add-campaign');
  }
  editCampaignDetails(campaignID: string): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    setTimeout(() => {
      this.router.navigate([`/edit-campaign/${campaignID}`]);
    }, 1000);
  }

  deleteCampaignHandler(id: any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    setTimeout(() => {
      this.campaignService.deleteCampaign(id).subscribe((response) => {
        this.snackbar.open(response.message, 'undo', {
          duration: 4000,
        });
      });
    }, 1000);
  }

  goBackHandler(): void {
    setTimeout(() => {
      this.spinner.show();
      this.isAddingCampaign = false;
      this.changeDetection.detectChanges();
    }, 2000);
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    console.log(this.isAddingCampaign);
  }

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    setTimeout(() => {
      this.campaignService.getCampaigns().subscribe((campaigns: any) => {
        this.campaignsList = campaigns.campaigns;
        console.log(campaigns);
      });
    }, 1000);
  }
}
