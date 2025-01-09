import { Component } from '@angular/core';
import { AmazonConnectService } from '../../amazon-connect/amazon.service';

@Component({
  selector: 'app-callcare',
  templateUrl: './callcare.component.html',
  styleUrl: './callcare.component.scss'
})
export class CallcareComponent {
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
  constructor(private amazonConnectService: AmazonConnectService){}

  // ngOnInit(): void {
  //   // Load the Amazon Connect script when the component is initialized
  //   this.amazonConnectService.loadScript();
  // }
}
