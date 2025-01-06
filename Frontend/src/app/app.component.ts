import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { HeaderService } from './shared/header/header.service';
// import config from './config.json'
import { MatDrawer } from '@angular/material/sidenav';
import { AlertService } from './shared/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLogin:boolean = false
  @ViewChild('drawer') drawer?: MatDrawer;
  @ViewChild('callDrawer') callDrawer?: MatDrawer;
  items = [
    { name: 'Dashboard', route: '/dashboard', icon: 'home' },
    { name: 'Calls-care', route: '/calls-care', icon: 'phone' },
    { name: 'Tickets', route: '/tickets', icon: 'person' },
    { name: 'Settings', route: '/settings', icon: 'settings' }
  ];
  showLoader: boolean = false;
  returnUrl: any;
  subscription: Subscription;
  result:any
  constructor(
    public mainService: AppService,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public headerService: HeaderService,
    public alertServices: AlertService,
    public dialog: MatDialog,
  ) {
    this.returnUrl = '';

    this.subscription = this.mainService.showLoaderEvt$.subscribe((evt: any) => {
      if (evt != null) {
        this.showLoader = evt;
      }
    });
    this.mainService.cadStatusData$.subscribe(res=>{
      this.isLogin = res;       
    })
    this.mainService.sideNavToggle$.subscribe(res=>{
      this.result = res
      if(this.result){
        this.drawer?.open()
        this.callDrawer?.open()
      }else if(!this.result){
        this.drawer?.close()
        this.callDrawer?.close()
      }
  })
}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}




