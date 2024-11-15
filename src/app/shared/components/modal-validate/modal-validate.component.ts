import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal-validate',
  templateUrl: './modal-validate.component.html',
  styleUrl: './modal-validate.component.scss',
  standalone: true,
  imports: [DialogModule, ButtonModule],
})
export class ModalValidateComponent {
  @Input() question: string = '';
  @Output() onValidate = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = false;

  Validate() {
    this.onValidate.emit();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.onCancel.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
