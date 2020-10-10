import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferEarnPageComponent } from './refer-earn-page.component';

describe('ReferEarnPageComponent', () => {
  let component: ReferEarnPageComponent;
  let fixture: ComponentFixture<ReferEarnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferEarnPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferEarnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
