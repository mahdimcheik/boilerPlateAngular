import { Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormationResponseDTO } from '../../../../shared/Models/formation';
import { FormationService } from '../../../../services/formation.service';
import { firstValueFrom } from 'rxjs';

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

  formationService = inject(FormationService);

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm() {
    this.isVisibleFormEditCourse = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }
  hidePopUpDelete() {
    this.popupDeleteVisible = false;
  }

  editForm(formation: FormationResponseDTO) {
    this.isVisibleFormEditCourse = false;
  }

  async deleteFormation() {
    // await firstValueFrom(this.formationService.);
    this.popupDeleteVisible = false;
  }
}
