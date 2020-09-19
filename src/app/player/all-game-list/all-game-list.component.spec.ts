import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGameListComponent } from './all-game-list.component';

describe('AllGameListComponent', () => {
  let component: AllGameListComponent;
  let fixture: ComponentFixture<AllGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
