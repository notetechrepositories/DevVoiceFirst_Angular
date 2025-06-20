// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { LandingComponent } from './UserPanel/landing/landing.component';
import { publicGuard } from './Services/AuthGuard/public.guard';
import { authGuard } from './Services/AuthGuard/auth.guard';
import { DocumentsComponent } from './UserPanel/documents/documents.component';
import { AboutUsComponent } from './UserPanel/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [publicGuard], // ⬅️ Only if not logged in
    children: [
      { path: '', component: LandingComponent },
      {path:'documents',component:DocumentsComponent},
      {path:'about-us',component:AboutUsComponent},
      {
        path: 'authentication',
        loadChildren: () =>
          import('./Authentication/authentication.module').then((m) => m.AuthenticationModule),
        canActivate: [publicGuard], // ⬅️ Also guarded
      },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./UserPanel/user.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./AdminPanel/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: 'superadmin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./SuperAdminPanel/superadmin.module').then((m) => m.SuperAdminModule),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
