import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainAreaComponent } from './admin-main-area.component';

describe('AdminMainAreaComponent', () => {
  let component: AdminMainAreaComponent;
  let fixture: ComponentFixture<AdminMainAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMainAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
