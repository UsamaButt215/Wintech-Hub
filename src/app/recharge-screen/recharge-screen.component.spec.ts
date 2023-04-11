import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeScreenComponent } from './recharge-screen.component';

describe('RechargeScreenComponent', () => {
  let component: RechargeScreenComponent;
  let fixture: ComponentFixture<RechargeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
