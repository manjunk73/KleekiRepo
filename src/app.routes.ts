import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './components/vendor-detail/vendor-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'vendors', component: VendorListComponent },
  { path: 'vendors/:id', component: VendorDetailComponent },
  { path: '**', redirectTo: '/login' }
];
