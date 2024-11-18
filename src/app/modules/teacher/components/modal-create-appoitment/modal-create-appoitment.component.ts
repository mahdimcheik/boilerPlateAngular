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
import { SlotCreateDTO } from '../../../../shared/Models/slot';

@Component({
  selector: 'app-modal-create-appoitment',
  templateUrl: './modal-create-appoitment.component.html',
  styleUrl: './modal-create-appoitment.component.scss',
})
export class ModalCreateAppoitmentComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() actionEmitter = new EventEmitter();
  @Input({ required: true }) appoitment: EventInput = {
    start: new Date(),
    end: new Date(),
  };
  start!: Date;
  end!: Date;

  slotService = inject(SlotService);

  ngOnInit(): void {
    console.log('Event from modal', this.appoitment);
    this.start = this.appoitment.start as Date;
    this.end = this.appoitment.end as Date;
  }

  cancel() {
    this.actionEmitter.emit();
  }
  validate() {
    const newAppoitment = {
      startAt: this.start,
      endAt: this.end,
      createdAt: new Date(),
      price: 10,
      reduction: 10,
      type: 0,
    };
    this.slotService
      .addSlotByCreator(newAppoitment as SlotCreateDTO)
      .subscribe();
    this.cancel();
  }
}
