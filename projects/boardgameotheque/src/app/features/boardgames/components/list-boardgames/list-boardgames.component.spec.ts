import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoardgamesComponent } from './list-boardgames.component';

describe('ListGamesComponent', () => {
  let component: ListBoardgamesComponent;
  let fixture: ComponentFixture<ListBoardgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBoardgamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBoardgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
