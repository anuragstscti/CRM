import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faGears,
  faHome,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-navigation-side-nav',
  templateUrl: './navigation-side-nav.component.html',
  styleUrl: './navigation-side-nav.component.scss'
})
export class NavigationSideNavComponent {
  iconList: any[] = [faHome, faGears, faWrench];
  expandedIndex: number | null = 0;
  @Input() navigationList: any[] = [];
  constructor(public router: Router, public activatedRoute: ActivatedRoute, public commonServices: AppService) {

  }
  ngAfterViewInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.expandPanelBasedOnRoute(currentRoute);
    });
  }

  expandPanelBasedOnRoute(currentRoute: string): void {
    let r1 = currentRoute.split('/');
    currentRoute = r1[r1.length - 1];
    this.navigationList.forEach((item, index) => {
      if (currentRoute.includes(item.route)) {
        this.expandedIndex = index;
      } else if (item.childRoute) {
        item.childRoute.forEach((child: any) => {
          if (child.route === currentRoute) {
            this.expandedIndex = index;
          } else if (child.childRoute) {
            child.childRoute.forEach((subChild: any) => {
              if (subChild.route === currentRoute) {
                this.expandedIndex = index;
              }
            });
          }
        });
      }
    });
  }

  callRouteFunction(child: any) {
    if (child.route === '#' || child.route === '') {
      this.commonServices.sideNavHashRouting(child);
    }
  }
  onPanelClick(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}


