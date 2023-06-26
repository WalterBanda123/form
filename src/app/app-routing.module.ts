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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
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
  // {
  //   path: 'campaign',
  //   component: CampaignsMainComponent,
  //   children: [
  //     {path:'', redirectTo:'campaigns', pathMatch:'full'},
  //     {
  //       path: 'campaigns',
  //       component: CampaignsComponent,
  //       canActivate: [LoginGuard],
  //     },
  //     {
  //       path: 'add-campaign',
  //       component: AddCampaignComponent,
  //     },
  //     {
  //       path: 'edit-campaign/:id',
  //       component: EditCampaignComponent,
  //       canActivate: [LoginGuard],
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
