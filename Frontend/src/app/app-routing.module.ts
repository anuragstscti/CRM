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
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: PagesComponent,
    children: [
    
      { path: 'home', component: DashboardComponent,canActivate:[AuthGuard]},
      { path: 'tickets', component: TicketsComponent,canActivate:[AuthGuard]},
      { path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]},
      { path: 'calls-care', component: CallcareComponent,canActivate:[AuthGuard]},
      { path: 'form-example', component: FormExampleComponent ,canActivate:[AuthGuard]},
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
      {path:'navigation',component:NavigationSideNavComponent,canActivate:[AuthGuard]},
     
      
    ]
  },

  { path: 'login', component: LoginComponent,canActivate:[AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

// Create an NgModule that contains all the directives for the routes specified above
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
