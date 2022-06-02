import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogBoxComponent } from './catelog-box.component';

describe('CatelogBoxComponent', () => {
  let component: CatelogBoxComponent;
  let fixture: ComponentFixture<CatelogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatelogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
