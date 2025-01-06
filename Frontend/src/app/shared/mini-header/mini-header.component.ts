import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrl: './mini-header.component.scss'
})
export class MiniHeaderComponent {

  @Input() leftHeaderNavElement: any[] = [];
  rightHeaderNavElement: any[] = [
    {
      route: 'vehicle-registration-query', icon: 'directions_car', name: 'Car', btnColor: '#02c39a', childRoute: []
    },
    {
      route: 'driver-license-query', icon: 'contact_mail', name: 'Contact Mail', btnColor: '#d62828', childRoute: []
    },
    {
      route: '#', icon: 'add_box', name: 'Add', btnColor: '#a7c957', childRoute: [
        {
          route: 'artical-single-query', icon: 'motorcycle', name: 'Motor Cycle', btnColor: '', childRoute: []
        },
        {
          route: 'boat-query', icon: 'directions_boat', name: 'Boat', btnColor: '', childRoute: []
        },
        {
          route: 'gun-query', icon: 'adjust', name: 'Gun', btnColor: '', childRoute: []
        },
        {
          route: 'CJIS', icon: 'list', name: 'Motor Cycle', btnColor: '', childRoute: []
        },
        {
          route: 'CJIS', icon: 'people', name: 'People', btnColor: '', childRoute: []
        },
      ]
    },
    {
      route: 'onloc', icon: 'local_hospital', name: 'To HOSP', btnColor: '#0081a7', childRoute: []
    },
    // {
    //   route: '#', icon: 'settings', name: 'Settings', btnColor: '#d62828', childRoute: []
    // },
    // {
    //   route: '#', icon: 'build', name: '', btnColor: '#02c39a', childRoute: []
    // },
  ]
  @ViewChild('carousel') carousel: ElementRef | null = null;
  isSmallScreen: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  ngOnInit() {
    this.isSmallScreen = window.innerWidth < 768;
    this.leftHeaderNavElement = this.leftHeaderNavElement.concat(this.rightHeaderNavElement)
  }

  next() {
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
    }
  }

  prev() {
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }
}
