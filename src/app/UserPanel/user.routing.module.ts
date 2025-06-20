import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { IssueReportingComponent } from './issue-reporting/issue-reporting.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ProfileComponent } from './profile/profile.component';
import { UserReportedIssuesComponent } from './user-reported-issues/user-reported-issues.component';
import { DocumentsComponent } from './documents/documents.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'issue-reporting/:id',
    component: IssueReportingComponent,
  },
  {
    path: 'qr-scanner',
    component: QrScannerComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path:'user-reported-issues',
    component:UserReportedIssuesComponent
  },
  {
    path:'documents',
    component:DocumentsComponent
  },
  {
    path:'about-us',
    component:AboutUsComponent
  },
  
];