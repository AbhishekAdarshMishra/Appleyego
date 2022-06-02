import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogCardComponent } from './catelog-card.component';

describe('CatelogCardComponent', () => {
  let component: CatelogCardComponent;
  let fixture: ComponentFixture<CatelogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatelogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
