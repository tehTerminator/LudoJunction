import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChallengeListComponent } from './my-challenge-list.component';

describe('MyChallengeListComponent', () => {
  let component: MyChallengeListComponent;
  let fixture: ComponentFixture<MyChallengeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyChallengeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChallengeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
