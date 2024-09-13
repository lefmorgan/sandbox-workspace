import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotListBoardgamesComponent } from './hot-list-boardgames.component';

describe('HotListBoardgamesComponent', () => {
  let component: HotListBoardgamesComponent;
  let fixture: ComponentFixture<HotListBoardgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotListBoardgamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotListBoardgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
