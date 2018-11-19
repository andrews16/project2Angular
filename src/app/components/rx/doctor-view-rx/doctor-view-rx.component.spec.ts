import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewRxComponent } from './doctor-view-rx.component';

describe('DoctorViewRxComponent', () => {
  let component: DoctorViewRxComponent;
  let fixture: ComponentFixture<DoctorViewRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorViewRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorViewRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
