import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarForReservationComponent } from './calendar-for-reservation.component';

describe('CalendarForReservationComponent', () => {
  let component: CalendarForReservationComponent;
  let fixture: ComponentFixture<CalendarForReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarForReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarForReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
