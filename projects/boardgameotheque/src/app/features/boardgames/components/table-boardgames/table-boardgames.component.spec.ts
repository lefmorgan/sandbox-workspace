import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBoardgamesComponent } from './table-boardgames.component';

describe('TableBoardgamesComponent', () => {
  let component: TableBoardgamesComponent;
  let fixture: ComponentFixture<TableBoardgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBoardgamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBoardgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
