import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DemoComponent } from './demo/demo.component';
import { BranchComponent } from './branch/branch.component';
import { IssuesComponent } from './issues/issues.component';
import { IssuesTypeComponent } from './issues-type/issues-type.component';
import { AddIssuetypeComponent } from './issues-type/add-issuetype/add-issuetype.component';
import { EmployeeComponent } from './employee/employee.component';
import { RolesComponent } from './roles/roles.component';
import { SectionComponent } from './section/section.component';
import { ProfileComponent } from './profile/profile.component';


export const AdminRoutes: Routes = [
  {
    path: '', redirectTo: 'admin-dash', pathMatch: 'full' 
  },
  {
    path: 'admin-dash',
    component: AdminDashboardComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'branch',
    component: BranchComponent,
    children: [
      {
        path: 'branch-section',
        component: SectionComponent
      }
    ]
  }
  ,
  {
    path:'branch-section/:id',
    component:SectionComponent
  },
  {
    path: 'issue',
    component: IssuesComponent
  },
  {
    path: 'issue-type',
    component: IssuesTypeComponent
  },
  {
    path: 'add-issuetype',
    component: AddIssuetypeComponent
  },
  

];