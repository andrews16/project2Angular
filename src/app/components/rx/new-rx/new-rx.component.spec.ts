import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRxComponent } from './new-rx.component';

describe('NewRxComponent', () => {
  let component: NewRxComponent;
  let fixture: ComponentFixture<NewRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
