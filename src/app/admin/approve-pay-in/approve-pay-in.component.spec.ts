import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePayInComponent } from './approve-pay-in.component';

describe('ApprovePayInComponent', () => {
  let component: ApprovePayInComponent;
  let fixture: ComponentFixture<ApprovePayInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePayInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePayInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
