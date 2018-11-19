import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule, MatTableModule } from '@angular/material';

import { RxTableComponent } from './rx-table.component';

describe('RxTableComponent', () => {
  let component: RxTableComponent;
  let fixture: ComponentFixture<RxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
