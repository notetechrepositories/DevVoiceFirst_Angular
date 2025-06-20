import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primengModules';
import { SuperAdminRoutes } from './superadmin.routing.module';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SuperAdminRoutes),
    PrimeNgModule
  ],
  declarations: [
    SuperadminDashboardComponent
  ],
  exports: [],
})
export class SuperAdminModule {}