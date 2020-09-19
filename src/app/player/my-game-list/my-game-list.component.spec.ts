import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGameListComponent } from './my-game-list.component';

describe('MyGameListComponent', () => {
  let component: MyGameListComponent;
  let fixture: ComponentFixture<MyGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
