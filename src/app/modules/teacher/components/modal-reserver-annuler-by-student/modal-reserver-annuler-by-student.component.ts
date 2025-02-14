import {
  AfterContentInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import {
  BookingCreateDTO,
  SlotUpdateDTO,
} from '../../../../shared/Models/slot';
import { SlotService } from '../../../../services/slot.service';
import { finalize } from 'rxjs';
import { HelpTypePipe } from '../../../../utilities/pipes/help-type.pipe';

type TypeHelpType = {
  id: number;
  value: string;
};
@Component({
  selector: 'app-modal-reserver-annuler-by-student',
  templateUrl: './modal-reserver-annuler-by-student.component.html',
  styleUrl: './modal-reserver-annuler-by-student.component.scss',
})
export class ModalReserverAnnulerByStudentComponent implements OnInit {
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
  subject: string = 'Cours particuliers';
  description: string = "Besoin d'aide";
  isInThePast: boolean = false;

  slotService = inject(SlotService);
  visibleEvents = this.slotService.visibleEvents;
  typeHelpTransformInstance: HelpTypePipe = new HelpTypePipe();
  typesHelp = [
    {
      id: 0,
      value: this.typeHelpTransformInstance.transform(0),
    },
    {
      id: 1,
      value: this.typeHelpTransformInstance.transform(1),
    },
    {
      id: 2,
      value: this.typeHelpTransformInstance.transform(2),
    },
  ];
  selectedType: TypeHelpType = this.typesHelp[0];

  ngOnInit(): void {
    this.start = this.appoitment.start as Date;
    this.end = this.appoitment.end as Date;
    this.isInThePast = new Date() > this.start;
  }

  cancel(shouldReload: boolean = false) {
    this.actionEmitter.emit(shouldReload);
    // this.slotService.visibleEvents.set([...this.slotService.visibleEvents()]);
  }
  validate() {
    if (this.appoitment.extendedProps?.['studentId']) {
      this.slotService
        .unbookReservationByStudent(this.appoitment.extendedProps?.['id'])
        .pipe(finalize(() => this.cancel(true)))
        .subscribe();
    } else {
      const newBooking: BookingCreateDTO = {
        slotId: this.appoitment.extendedProps?.['id'],
        subject: this.subject,
        description: this.description,
        typeHelp: this.selectedType.id,
      };
      this.slotService
        .bookSlot(newBooking)
        .pipe(finalize(() => this.cancel(true)))
        .subscribe();
    }
  }
  // isInThePast() {
  //   return new Date() > this.start;
  // }
}
