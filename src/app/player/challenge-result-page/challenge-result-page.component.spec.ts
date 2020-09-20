import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeResultPageComponent } from './challenge-result-page.component';

describe('ChallengeResultPageComponent', () => {
  let component: ChallengeResultPageComponent;
  let fixture: ComponentFixture<ChallengeResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeResultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
