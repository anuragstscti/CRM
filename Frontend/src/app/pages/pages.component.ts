import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { AlertService } from '../shared/alert/alert.service';
import { HeaderService } from '../shared/header/header.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {
  isLogin:boolean = false
  showLoader: boolean = false;
  userProfileSettings: any = { theme: 'light', fontSize: '1x' };
  subscription: Subscription;
  @ViewChild(AppComponent) appComponent!: AppComponent;
  constructor(
    public mainService: AppService,
    public headerService: HeaderService,
    public router: Router,
    public alertService: AlertService,
  ) {
    this.mainService.cadStatusData$.subscribe(res=>{
      this.isLogin = res;       
    })
    this.subscription = this.mainService.showLoaderEvt$.subscribe((evt: any) => {
      if (evt != null) {
        this.showLoader = evt;
      }
    });

    this.subscription = this.headerService.changeSize$.subscribe((res: any) => {
      if (res) {
        this.toggleFontSize(res);
      }
    })
    this.subscription = this.mainService.changeTheme$.subscribe((res: any) => {
      if (res) {
        this.toggleTheme(res);
      }
    })

  }

  ngOnInit(): void {
  }

  sessionTimer(){
    let sessionOutTime= setInterval(() => {
      let expiresOn = new Date(JSON.parse(localStorage.getItem('authToken') ?? '{}')?.sessionTimeout).getTime() < new Date().getTime()+60000;
      if(expiresOn){
        clearInterval(sessionOutTime);
      }
    },1000)
    // let expiresOn = new Date(JSON.parse(localStorage.getItem('authToken') ?? '{}')?.sessionTimeout).getTime() - new Date().getTime();
    // setTimeout(() =>{
    //   this.authGuard.logout();
    // },expiresOn-15000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getUserSeeingDetails() {
    this.mainService.get('user/profile/preference').subscribe({
      next: (evt: any) => {
        this.toggleTheme(evt?.displayMode.toLowerCase() ?? 'light');
        this.toggleFontSize(evt?.fontSize ?? '1x');
      },
      error: (err: any) => {
        this.toggleTheme('light');
        this.toggleFontSize('1x');
        this.saveFontThemes({ displayMode: 'light', fontSize: '1x' });
      }
    })
  }

  saveFontThemes(value: any) {
    value['userId'] = JSON.parse(localStorage.getItem('authToken') ?? '{}').userDetails.userId;
    this.mainService.post('user/profile/preference', value).subscribe({
      error: (err: any) => {
        if (err.error) {
          this.alertService.error(err?.error?.error ?? 'Oops! Something went wrong. Please contact support if the issue persists.');
        } else {
          this.mainService.sendErrorMessage(err.status.toString());
        }
      }
    })
  }

  // Manage Theme 
  public toggleTheme(res: string) {
    if (res == 'dark') {
      document.body.classList.remove('light-mode');
      document.body.classList.remove('defult-mode');
      document.body.classList.add('dark-mode');

    } else if (res == 'light') {
      document.body.classList.remove('defult-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');


    } else if (res == 'primary') {
      document.body.classList.remove('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('defult-mode');
    }
    this.userProfileSettings.theme = res ?? 'light';
  }
  // Manage Theme 
  public toggleFontSize(res: string) {
    if (res == '1x') {
      document.body.classList.remove('medium-font-size');
      document.body.classList.remove('large-font-size');
      document.body.classList.add('small-font-size');
    } else if (res == '2x') {
      document.body.classList.remove('small-font-size');
      document.body.classList.remove('large-font-size');
      document.body.classList.add('medium-font-size');
    } else if (res == '3x') {
      document.body.classList.remove('small-font-size');
      document.body.classList.remove('medium-font-size');
      document.body.classList.add('large-font-size');
    }
    this.userProfileSettings.fontSize = res ?? '1x';
  }
}
