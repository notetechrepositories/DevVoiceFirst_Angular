import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutes } from './admin.routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DemoComponent } from './demo/demo.component';
import { PrimeNgModule } from '../primengModules';
import { BranchComponent } from './branch/branch.component';
import { IssuesComponent } from './issues/issues.component';
import { IssuesTypeComponent } from './issues-type/issues-type.component';
import { AddIssuetypeComponent } from './issues-type/add-issuetype/add-issuetype.component';
import { EmployeeComponent } from './employee/employee.component';
import { RolesComponent } from './roles/roles.component';
import { SectionComponent } from './section/section.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AdminRoutes),
    PrimeNgModule
  ],
  declarations: [
    AdminDashboardComponent,
    RolesComponent,
    DemoComponent,
    BranchComponent,
    IssuesComponent,
    IssuesTypeComponent,
    AddIssuetypeComponent,
    EmployeeComponent,
    SectionComponent,
    ProfileComponent
  ],
  exports: [],
})
export class AdminModule {}