import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertComponent } from './alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.showMessage(message, 'success');
  }

  error(message: string) {
    this.showMessage(message, 'error');
  }

  info(message: string) {
    this.showMessage(message, 'info');
  }

  warning(message: string) {
    this.showMessage(message, 'warning');
  }

  private showMessage(message: string, type: string) {
    const config = new MatSnackBarConfig();
    config.data = { message, type };
    config.duration = 5000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'top';

    this.snackBar.openFromComponent(AlertComponent, config);
  }
}
