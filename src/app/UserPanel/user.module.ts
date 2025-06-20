import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UsersRoutes } from './user.routing.module';
import { LandingComponent } from './landing/landing.component';
import { IssueReportingComponent } from './issue-reporting/issue-reporting.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { PrimeNgModule } from '../primengModules';
import { ProfileComponent } from './profile/profile.component';
import { UserReportedIssuesComponent } from './user-reported-issues/user-reported-issues.component';
import { DocumentsComponent } from './documents/documents.component';
import { SafePipe } from './documents/safe.pipe';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UsersRoutes),
    RouterOutlet,
    ReactiveFormsModule,
    PrimeNgModule,
    ZXingScannerModule
  ],
  declarations: [
    HomeComponent,
    IssueReportingComponent,
    QrScannerComponent,
    ProfileComponent,
    UserReportedIssuesComponent,
    DocumentsComponent,
    AboutUsComponent,
    SafePipe 
  ],
  exports: [],
})
export class UsersModule {}