import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMuserComponent } from './crmuser.component';

describe('CRMuserComponent', () => {
  let component: CRMuserComponent;
  let fixture: ComponentFixture<CRMuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRMuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRMuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
