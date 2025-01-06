import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { AuthService } from '../../guard/auth.service';
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
  constructor(
    public fb:FormBuilder,
    @Optional() private dialogRef: MatDialogRef<LoginComponent>,
    private readonly commonservice:AppService,
    public authService:AuthService,
    public router:Router
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
          this.isLogin = true
          this.commonservice.cadStatusData.next(this.isLogin)
        },
        // error: (err) => {
        //   this.errorMessage = 'Invalid credentials, please try again!';
        // }
      });
    
    }
  }




  email: string = '';
  password: string = '';

  onLoginSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
