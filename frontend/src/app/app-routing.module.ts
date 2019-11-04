import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadModulesStrategy } from './core/strategy/PreloadModulesStrategy';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadModulesStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
