import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteAppointmentComponent } from './modal-delete-appointment.component';

describe('ModalDeleteAppointmentComponent', () => {
  let component: ModalDeleteAppointmentComponent;
  let fixture: ComponentFixture<ModalDeleteAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
