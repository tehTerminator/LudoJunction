import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePayOutComponent } from './approve-pay-out.component';

describe('ApprovePayOutComponent', () => {
  let component: ApprovePayOutComponent;
  let fixture: ComponentFixture<ApprovePayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePayOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
