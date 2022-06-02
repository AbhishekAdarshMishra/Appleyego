import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCard2Component } from './search-card2.component';

describe('SearchCard2Component', () => {
  let component: SearchCard2Component;
  let fixture: ComponentFixture<SearchCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
