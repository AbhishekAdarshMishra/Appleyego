import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCard2Component } from './category-card2.component';

describe('CategoryCard2Component', () => {
  let component: CategoryCard2Component;
  let fixture: ComponentFixture<CategoryCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
