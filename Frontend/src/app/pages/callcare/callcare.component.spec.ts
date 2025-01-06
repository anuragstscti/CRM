import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallcareComponent } from './callcare.component';

describe('CallcareComponent', () => {
  let component: CallcareComponent;
  let fixture: ComponentFixture<CallcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallcareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
