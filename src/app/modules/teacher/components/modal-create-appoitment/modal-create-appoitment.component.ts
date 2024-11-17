import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-create-appoitment',
  templateUrl: './modal-create-appoitment.component.html',
  styleUrl: './modal-create-appoitment.component.scss',
})
export class ModalCreateAppoitmentComponent {
  @Input() visible: boolean = false;
  @Output() actionEmitter = new EventEmitter();

  cancel() {
    this.actionEmitter.emit();
  }
  validate() {
    this.cancel();
  }
}
