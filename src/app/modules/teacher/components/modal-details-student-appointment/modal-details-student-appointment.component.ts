import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import { SlotUpdateDTO } from '../../../../shared/Models/slot';
import { SlotService } from '../../../../services/slot.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-details-student-appointment',
  templateUrl: './modal-details-student-appointment.component.html',
  styleUrl: './modal-details-student-appointment.component.scss',
})
export class ModalDetailsStudentAppointmentComponent {
  @Input() visible: boolean = false;
  @Output() actionEmitter = new EventEmitter<boolean>(false);
  @Input({ required: true }) appoitment: EventInput = {
    // appointment to change
    start: new Date(),
    end: new Date(),
    extendedProps: {},
  };
  start!: Date;
  end!: Date;
  price: number = 15;
  reduction: number = 0;

  slotService = inject(SlotService);
  visibleEvents = this.slotService.visibleEvents;

  ngOnInit(): void {
    this.start = this.appoitment.start as Date;
    this.end = this.appoitment.end as Date;
  }
  cancel(shouldRelaod: boolean = false) {
    this.actionEmitter.emit(shouldRelaod);
    // this.slotService.visibleEvents.set([...this.slotService.visibleEvents()]);
  }
  validate() {
    if (this.appoitment.extendedProps?.['studentId']) {
      this.slotService
        .unbookReservationByTeacher(this.appoitment.extendedProps?.['id'])
        .pipe(finalize(() => this.cancel(true)))
        .subscribe();
    } else {
      this.slotService
        .deleteSlotByCreator(this.appoitment.extendedProps?.['id'])
        .pipe(finalize(() => this.cancel(true)))
        .subscribe();
    }
  }

  update() {
    const slotUpdateDTO: SlotUpdateDTO = {
      id: this.appoitment.extendedProps?.['id'],
      startAt: this.start,
      endAt: this.end,
      createdAt: new Date(),
      price: this.price,
      reduction: this.reduction,
      type: this.appoitment.extendedProps?.['type'] ?? 0,
    };
    this.slotService
      .updateSlotByCreator(slotUpdateDTO)
      .pipe(finalize(() => this.cancel(true)))
      .subscribe();
  }
}
