import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import { SlotService } from '../../../../services/slot.service';
import { SlotCreateDTO, SlotUpdateDTO } from '../../../../shared/Models/slot';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-update-appointment',
  templateUrl: './modal-update-appointment.component.html',
  styleUrl: './modal-update-appointment.component.scss',
})
export class ModalUpdateAppointmentComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() actionEmitter = new EventEmitter();
  @Input({ required: true }) appoitment: EventInput = {
    // appointment to change
    start: new Date(),
    end: new Date(),
    extendedProps: {},
  };
  @Input() newSlot: EventInput = {
    // new slot place , when we drag and drop mofo
    start: new Date(),
    end: new Date(),
  };
  start!: Date;
  end!: Date;

  slotService = inject(SlotService);
  visibleEvents = this.slotService.visibleEvents; // signal

  ngOnInit(): void {
    this.start = this.newSlot.start as Date;
    this.end = this.newSlot.end as Date;
  }

  cancel() {
    this.actionEmitter.emit();
    this.slotService.visibleEvents.set([...this.slotService.visibleEvents()]);
  }
  validate() {
    const newAppoitment: SlotUpdateDTO = {
      startAt: this.start,
      endAt: this.end,
      createdAt: new Date(),
      price: 10,
      reduction: 10,
      type: 0,
      id: this.appoitment.extendedProps?.['id'] ?? '',
    } as SlotUpdateDTO;
    this.slotService
      .updateSlotByCreator(newAppoitment as SlotUpdateDTO)
      .pipe(finalize(() => this.cancel()))
      .subscribe();
  }
}
