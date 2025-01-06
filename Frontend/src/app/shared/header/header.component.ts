import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HeaderService } from './header.service';
import { AlertService } from '../alert/alert.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userProfileSettings: any = { theme: 'light', fontSize: '1x' };
  isToggled: boolean = true;
  callCare:boolean = false;
  themeName: string = 'light';
  currentTime!: string;
  signalStrength: number = 0;
  showButtons: any;
  showAdd = false;
  profileName: any;
  isMatMenuOpen: boolean = false;
  isMatMenu2Open: boolean = false;
  enteredButton: boolean = false;
  buttonTextValue: string = '';
  currentRoute: string = '';
  ren: any;
  prevButtonTrigger: any;
  cadStatusSubscription!: Subscription;
  currentModule!: string;
  subscription: Subscription | undefined;
  userDetails = JSON.parse(localStorage.getItem('authToken') ?? '{}');
  isIncidentAssigned: boolean = false;
  constructor( public dialog: MatDialog, public router: Router, public commonServices: AppService, public mainService: AppService, public headerService: HeaderService, public alertServices: AlertService) {
    this.cadStatusSubscription = this.mainService.cadStatusData$.subscribe((res) => {
      if (res !== null) {
        this.buttonTextValue = res;
      }
    });
    this.router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
    });
  }
  ngOnInit() {  
    this.headerService.sendDateData$.subscribe(
      {
        next: (x: any) => {
          if (x == null) {
            this.showAdd = true;
          }
          else {
            this.showAdd = x;
          }
        }
      })

  }







  ngOnDestroy() {
    this.headerService.sendDateDatas(true);
    this.subscription && this.subscription.unsubscribe();
  }
  // Open side nav
  payload:boolean = false
  openSideNav(name:any) {
    if(name == 'sidenav'){
      this.isToggled = !this.isToggled;
      this.payload = this.isToggled
    }else if(name == 'callCare'){
    this.callCare = !this.callCare 
    this.payload = this.callCare  
    }
    let obj={
      'isToggled':this.payload,
       'callCare':name
    }
    this.mainService.sideNavToggle.next(obj)
  }
  // Manage Theme

  // Manage Size of the screen
  






}