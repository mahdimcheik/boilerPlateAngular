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
  isVisibleFormEditFormation = false;
  popupDeleteVisible = false;

  formationService = inject(FormationService);

  showEditForm() {
    this.isVisibleFormEditFormation = true;
  }

  hideEditForm() {
    this.isVisibleFormEditFormation = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }
  hidePopUpDelete() {
    this.popupDeleteVisible = false;
  }

  editForm(formation: FormationResponseDTO) {
    this.isVisibleFormEditFormation = false;
  }

  async deleteFormation() {
    await firstValueFrom(
      this.formationService.deleteFormation(this.formation.id)
    );
    this.popupDeleteVisible = false;
  }
}
