import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditComponent } from './components/edit/edit.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CallModalComponent } from './components/call-modal/call-modal.component';
import { MeetingModalComponent } from './components/meeting-modal/meeting-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatExpansionModule} from "@angular/material/expansion"
import { CompaniesComponent } from './components/companies/companies.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';
import { CampaignsMainComponent } from './components/campaigns-main/campaigns-main.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DialogComponent,
    EditComponent,
    TopbarComponent,
    LoginComponent,
    SignupComponent,
    RedirectComponent,
    CallModalComponent,
    MeetingModalComponent,
    CompaniesComponent,
    CampaignsComponent,
    AddCampaignComponent,
    EditCampaignComponent,
    CampaignsMainComponent,
    DeleteDialogComponent,
    UserProfileComponent,
    NotificationsComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatExpansionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
