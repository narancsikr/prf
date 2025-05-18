import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'add-product', loadComponent: () => import('./add-product/add-product.component').then((c) => c.AddProductComponent), canActivate: [authGuard] },
    { path: 'product-management', loadComponent: () => import('./product-management/product-management.component').then((c) => c.ProductManagementComponent), canActivate: [authGuard] },
    { path: 'market', loadComponent: () => import('./market/market.component').then((c) => c.MarketComponent), canActivate: [authGuard] },
    { path: 'market-view', loadComponent: () => import('./market-view/market-view.component').then((c) => c.MarketViewComponent) },
    { path: '**', redirectTo: 'login' }
];
