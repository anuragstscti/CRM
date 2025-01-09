import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userForm: FormGroup;
  result:any;
  constructor(private readonly fb: FormBuilder,
    private readonly commonservice:AppService,
    private readonly alertService:AlertService,) {

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [
        Validators.required, 
        Validators.pattern('^\\+?[1-9]\\d{1,14}$') // Simple phone number pattern
      ]],
      dob: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      let url = 'api/Auth/register'
      let data = {
      'userName': this.userForm.controls['name'].value,
      'email':this.userForm.controls['email'].value,
      'password':this.userForm.controls['password'].value,
      'phoneNumber':this.userForm.controls['phone'].value,
      'dateOfBirth':this.userForm.controls['dob'].value,
      }
      this.commonservice.post(url,data).subscribe(res=>{
        this.result = res
        this.alertService.success("User Registered Sucessfully")
        this.userForm.reset()
      })

    } else {
      console.log('Form is invalid');
    }
  }
}
