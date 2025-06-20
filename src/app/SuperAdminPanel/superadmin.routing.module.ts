import { Routes } from '@angular/router';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';




export const SuperAdminRoutes: Routes = [
  {
    path: '',
    component: SuperadminDashboardComponent
  },
   {
    path: 'superadmin-dashboard',
    component: SuperadminDashboardComponent
  },

];