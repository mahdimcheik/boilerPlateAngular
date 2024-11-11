import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleEmitter = new EventEmitter<boolean>(true);

  hideModal() {
    this.visibleEmitter.emit(false);
  }
}
