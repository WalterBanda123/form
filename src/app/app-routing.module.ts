import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginGuard } from './login.guard';
import { RedirectComponent } from './components/redirect/redirect.component';
import { EditComponent } from './components/edit/edit.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'campaigns',
    component: CampaignsComponent,
    canActivate: [LoginGuard],

  },
  {
    path: 'add-campaign',
    component: AddCampaignComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'edit-campaign/:id',
    component: EditCampaignComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'edit-details/:id',
    component: EditComponent,
    canActivate: [LoginGuard],
  },

  { path: 'signup', component: SignupComponent },
  { path: 'redirect', component: RedirectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
