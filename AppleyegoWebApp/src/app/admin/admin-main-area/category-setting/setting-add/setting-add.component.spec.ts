import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAddComponent } from './setting-add.component';

describe('SettingAddComponent', () => {
  let component: SettingAddComponent;
  let fixture: ComponentFixture<SettingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
