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
  countryCodes: { code: string, name: string }[] = [
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    { code: '+33', name: 'France' }
  ];

  selectedCountryCode: string = '+1'; // Default country code (USA)
  phoneNumber: string = '';  // User input for phone number
  dialedNumber: string | null = null;

  // Add a digit to the phone number
  appendToPhoneNumber(digit: string) {
    this.phoneNumber += digit;
  }

  // Remove last digit from phone number
  backspace() {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
  }

  // Handle the dial button click
  dialNumber() {
    if (!this.phoneNumber.trim()) {
      alert('Please enter a phone number.');
      return;
    }
    this.dialedNumber = this.selectedCountryCode + this.phoneNumber;
    console.log('Dialing:', this.dialedNumber);
  }
  ngOnInit() {
    this.flag = false;   
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
