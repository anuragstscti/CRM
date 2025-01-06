import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSideNavComponent } from './navigation-side-nav.component';

describe('NavigationSideNavComponent', () => {
  let component: NavigationSideNavComponent;
  let fixture: ComponentFixture<NavigationSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
