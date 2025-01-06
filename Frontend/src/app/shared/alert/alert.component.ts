import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA, MatSnackBarRef,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<AlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }
  
  getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return '';
    }
  }
}
