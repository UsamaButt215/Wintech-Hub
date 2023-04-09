import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownOfferComponent } from './countdown-offer.component';

describe('CountdownOfferComponent', () => {
  let component: CountdownOfferComponent;
  let fixture: ComponentFixture<CountdownOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
