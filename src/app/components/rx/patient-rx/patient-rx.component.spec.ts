import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRxComponent } from './patient-rx.component';

describe('PatientRxComponent', () => {
  let component: PatientRxComponent;
  let fixture: ComponentFixture<PatientRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
