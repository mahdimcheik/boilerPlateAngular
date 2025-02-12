import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import { SlotUpdateDTO } from '../../../../shared/Models/slot';
import { SlotService } from '../../../../services/slot.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-reserver-annuler-by-student',
  templateUrl: './modal-reserver-annuler-by-student.component.html',
  styleUrl: './modal-reserver-annuler-by-student.component.scss',
})
export class ModalReserverAnnulerByStudentComponent {
  @Input() visible: boolean = false;
  @Output() actionEmitter = new EventEmitter();
  @Input({ required: true }) appoitment: EventInput = {
    // appointment to change
    start: new Date(),
    end: new Date(),
    extendedProps: {},
  };
  start!: Date;
  end!: Date;

  slotService = inject(SlotService);
  visibleEvents = this.slotService.visibleEvents;

  ngOnInit(): void {
    this.start = this.appoitment.start as Date;
    this.end = this.appoitment.end as Date;
  }
  cancel() {
    this.actionEmitter.emit();
    // this.slotService.visibleEvents.set([...this.slotService.visibleEvents()]);
  }
  validate() {
    if (this.appoitment.extendedProps?.['studentId']) {
      this.slotService
        .unbookReservationByTeacher(this.appoitment.extendedProps?.['id'])
        .pipe(finalize(() => this.cancel()))
        .subscribe();
    } else {
      this.slotService
        .deleteSlotByCreator(this.appoitment.extendedProps?.['id'])
        .pipe(finalize(() => this.cancel()))
        .subscribe();
    }
  }
}
