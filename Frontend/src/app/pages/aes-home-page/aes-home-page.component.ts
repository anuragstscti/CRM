import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alert/alert.service';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../shared/header/header.service';
import { environment as config } from '../../../environments/environment';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../guard/auth.service';
@Component({
  selector: 'app-aes-home-page',
  templateUrl: './aes-home-page.component.html',
  styleUrl: './aes-home-page.component.scss'
})
export class AesHomePageComponent {
  moveToDashboard:any
  @ViewChild('drawer') drawer?: MatDrawer;
  @ViewChild('callDrawer') callDrawer?: MatDrawer;
  items = [
    { name: 'Dashboard', route: '/dashboard', icon: 'home' },
    { name: 'Calls-care', route: '/calls-care', icon: 'phone' },
    { name: 'Tickets', route: '/tickets', icon: 'person' },
    { name: 'Settings', route: '/settings', icon: 'settings' }
  ];
  result:any
  applicationList: any = [];
  menuHeader = 'AES Main Menus';
  selectedParent: any = null;
  flag = false;
  subscription: Subscription | undefined
  authData: any;
  constructor(public router: Router,
    public authService:AuthService,
    public commonServices: AppService, public headerService: HeaderService, public alertServices: AlertService) { 
this.commonServices.sideNavToggle$.subscribe(res=>{
this.result = res
if(this.result.callCare == 'sidenav' && this.result.isToggled){
  this.drawer?.open()
  this.callDrawer?.close()
}if(this.result.callCare == 'sidenav' && !this.result.isToggled){
  this.drawer?.close()
}
 if(this.result.callCare == 'callCare' && this.result.isToggled ){
  this.drawer?.open()
  this.callDrawer?.open()
}
if(this.result.callCare == 'callCare' && !this.result.isToggled ){
  this.drawer?.open()
  this.callDrawer?.close()
}
})


  }
  ngOnInit() {
    this.flag = false;
    // this.authData = JSON.parse(localStorage.getItem('authToken') || '{}').userDetails;
    // this.subscription = this.commonServices.get('menuservice/menus/user/' + 'uqed').subscribe({
    //   next: (res: any) => {
    //     this.applicationList = res;
    //     this.headerService.sendDateDatas(false);
    //   },
    //   error: (err: any) => {
    //     if (err.error) {
    //       this.alertServices.error(err?.error?.error ?? 'Oops! Something went wrong. Please contact support if the issue persists.');
    //     } else {
    //       this.commonServices.sendErrorMessage(err.status.toString());
    //     }
    //   }
    // })
  }


  selectParent(app: any) {
    this.menuHeader = app.menuName;
    this.selectedParent = app;
  }

  getChildItems(moduleName: any) {
    let currentUrls: string = '';
    let module = moduleName.trim();
    if (module == "DISPATCH MOBILE") {
      if (this.authData.unitId) {
        currentUrls = 'aes/call-slip';
        window.open(`${config?.urls?.redirectUri}/${currentUrls}`, '_blank');
      } else if (this.authData.unitId == null || this.authData.unitId == '') {
        currentUrls = 'cad/dispatch-position';
        window.open(`${config?.urls?.redirectUri}/${currentUrls}`, '_blank');
      }
    } else if (module == 'ACUITY CAD') {
      currentUrls = 'cad/dispatch-position';
      window.open(`${config?.urls?.redirectUri}/${currentUrls}`, '_blank');
    }
  }

  ngOnDestroy() {
    this.menuHeader = 'AES Main Menus'
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }
  close() {
    this.selectedParent = null;
    this.menuHeader = 'AES Main Menus'
  }

 

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
