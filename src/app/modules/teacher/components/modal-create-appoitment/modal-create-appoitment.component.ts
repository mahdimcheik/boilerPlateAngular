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
  price: number = 15;
  reduction: number = 0;

  slotService = inject(SlotService);

  ngOnInit(): void {
    this.start = this.appoitment.start as Date;
    this.end = this.appoitment.end as Date;
  }

  cancel() {
    this.actionEmitter.emit();
  }
  validate() {
    if (
      this.price < 0 ||
      this.price > 200 ||
      this.reduction < 0 ||
      this.reduction > 100
    )
      return;
    const newAppoitment = {
      startAt: this.start,
      endAt: this.end,
      createdAt: new Date(),
      price: this.price,
      reduction: this.reduction,
      type: 0,
    };
    this.slotService
      .addSlotByCreator(newAppoitment as SlotCreateDTO)
      .subscribe();
    this.cancel();
  }
}
