import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
