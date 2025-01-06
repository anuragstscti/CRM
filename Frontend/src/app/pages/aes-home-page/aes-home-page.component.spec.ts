import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AesHomePageComponent } from './aes-home-page.component';

describe('AesHomePageComponent', () => {
  let component: AesHomePageComponent;
  let fixture: ComponentFixture<AesHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AesHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AesHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
