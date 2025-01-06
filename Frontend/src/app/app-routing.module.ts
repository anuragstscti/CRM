import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';
import { LoginComponent } from './pages/login-page/login-page.component';
import { PagesComponent } from './pages/pages.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FormExampleComponent } from './shared/components/form-example/form-example.component';
import { AesHomePageComponent } from './pages/aes-home-page/aes-home-page.component';
import { NavigationSideNavComponent } from './shared/navigation-side-nav/navigation-side-nav.component';
import { CallcareComponent } from './pages/callcare/callcare.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent,canActivate:[AuthGuard]},
      { path: 'tickets', component: TicketsComponent},
      { path: 'settings', component: SettingsComponent},
      { path: 'calls-care', component: CallcareComponent},
      { path: 'form-example', component: FormExampleComponent },
      { path: 'dashboard', component: DashboardComponent},
      {path:'navigation',component:NavigationSideNavComponent},
      // {
      //   path: 'cad',        
      //   loadChildren: () => import('./modules/cad/cad.module').then(m => m.CadModule)
      // },

      // {
      //   path: 'aes',        
      //   loadChildren: () => import('./modules/aes/aes.module').then(m => m.AesModule)
      // },
      // {
      //   path: 'case-management',        
      //   loadChildren: () => import('./modules/case-management/case-management.module').then(m => m.CaseManagementModule)
      // }
      
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

// Create an NgModule that contains all the directives for the routes specified above
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
