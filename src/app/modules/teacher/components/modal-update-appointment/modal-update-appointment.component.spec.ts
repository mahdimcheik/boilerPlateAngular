import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateAppointmentComponent } from './modal-update-appointment.component';

describe('ModalUpdateAppointmentComponent', () => {
  let component: ModalUpdateAppointmentComponent;
  let fixture: ComponentFixture<ModalUpdateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
