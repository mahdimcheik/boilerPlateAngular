import { Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormationResponseDTO } from '../../../../shared/Models/formation';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss',
})
export class FormationComponent {
  @Input() formation!: FormationResponseDTO;
  @Input() editModeOn: boolean = true;
  isVisibleFormEditCourse = false;
  popupDeleteVisible = false;

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm() {
    this.isVisibleFormEditCourse = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }

  editForm(formation: FormationResponseDTO) {
    this.isVisibleFormEditCourse = false;
  }

  deleteFormation() {}
}
