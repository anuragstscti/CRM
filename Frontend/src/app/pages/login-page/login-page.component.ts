import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { AuthService } from '../../guard/auth.service';
import { AlertService } from '../../shared/alert/alert.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginComponent {
  closeLoginDialogSubscription!: Subscription;
  loginForm:FormGroup
  result:any
  isLogin:boolean = false;
  loggedIn:boolean = true;
  email: string = '';
  password: string = '';
  constructor(
    public fb:FormBuilder,
    @Optional() private readonly dialogRef: MatDialogRef<LoginComponent>,
    private readonly commonservice:AppService,
    public authService:AuthService,
    public router:Router,
    public alertService:AlertService
  ) {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })  
  }


  login() {
    let mail = this.loginForm.controls['email'].value
    let password = this.loginForm.controls['password'].value
    if(this.loginForm.valid){
      this.authService.login(mail, password).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
          this.setToken(response)
          this.isLogin = true
          this.alertService.success("user login successfully")
          this.commonservice.cadStatusData.next(this.isLogin)
          setTimeout(() => {
            this.logout();
          }, 600000);
        },
        error: (err) => {
          this.alertService.error( 'Invalid credentials, please try again!')
        }
      });
    
    }
  }
  setToken(response:any): void {
    localStorage.setItem('authToken',response.token);
    localStorage.setItem('appUserID',response.appUserID);
    let email = this.loginForm.controls['email'].value.replace(/"/g, '');
    localStorage.setItem('userDetails', email);   
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('appUserID');
    this.router.navigate(['/login'])
  }

  onLoginSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  
}
