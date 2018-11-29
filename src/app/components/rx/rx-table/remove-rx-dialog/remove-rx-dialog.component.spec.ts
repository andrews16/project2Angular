import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRxDialogComponent } from './remove-rx-dialog.component';

describe('RemoveRxDialogComponent', () => {
  let component: RemoveRxDialogComponent;
  let fixture: ComponentFixture<RemoveRxDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveRxDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
