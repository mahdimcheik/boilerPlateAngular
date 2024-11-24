import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import { SlotUpdateDTO } from '../../../../shared/Models/slot';
import { SlotService } from '../../../../services/slot.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-book-delete-appointment',
  templateUrl: './modal-book-delete-appointment.html',
  styleUrl: './modal-book-delete-appointment.scss',
})
export class ModalBookDeleteAppointmentComponent {
  @Input() visible: boolean = false;
  @Output() actionEmitter = new EventEmitter();
  @Input() isDelete: boolean = false;
  @Input({ required: true }) appoitment: EventInput = {
    // appointment to change
    start: new Date(),
    end: new Date(),
    extendedProps: {},
  };

  start!: Date;
  end!: Date;

  slotService = inject(SlotService);
  visibleEvents = this.slotService.visibleEvents; // signal

  ngOnInit(): void {
    this.start = this.appoitment.start as Date;
    this.end = this.appoitment.end as Date;
  }
  cancel() {
    this.actionEmitter.emit();
    this.slotService.visibleEvents.set([...this.slotService.visibleEvents()]);
  }
  validate() {
    this.slotService
      .bookSlot(this.appoitment.extendedProps?.['id'])
      .pipe(finalize(() => this.cancel()))
      .subscribe();
  }
}
