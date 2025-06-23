import { Routes } from '@angular/router';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';




export const SuperAdminRoutes: Routes = [
  {
    path: '', redirectTo: 'superadmin-dashboard', pathMatch: 'full' 
  },
  {
    path: 'superadmin-dashboard',
    component: SuperadminDashboardComponent
  },

];