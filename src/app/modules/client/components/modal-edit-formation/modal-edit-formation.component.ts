import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormationCreateDTO,
  FormationResponseDTO,
} from '../../../../shared/Models/formation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { FormationService } from '../../../../services/formation.service';
import { finalize, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-edit-formation',
  templateUrl: './modal-edit-formation.component.html',
  styleUrl: './modal-edit-formation.component.scss',
})
export class ModalEditFormationComponent {
  @Input() formationTochange!: FormationResponseDTO;
  @Input() updateOrAdd: 'update' | 'add' = 'update';
  @Output() actionEmitter = new EventEmitter<void>();
  title!: string;
  @Input() isVisibleModalAddFormation: boolean = false;

  authService = inject(AuthService);
  formationService = inject(FormationService);
  fb = inject(FormBuilder);

  userForm!: FormGroup;

  ngOnInit(): void {
    console.log('popup edit formation ');

    if (this.updateOrAdd == 'update') {
      // pour primeng drop down options
      this.title = 'Editer la formation suivante';

      this.userForm = this.fb.group({
        id: [this.formationTochange.id],
        title: [this.formationTochange.title, [Validators.required]],
        company: [this.formationTochange.company, [Validators.required]],
        city: [this.formationTochange.city, [Validators.required]],
        country: [this.formationTochange.country, [Validators.required]],
        startAt: [new Date(this.formationTochange.startAt)],
        endAt: [new Date(this.formationTochange.endAt)],
      });
    } else if (this.updateOrAdd == 'add') {
      this.title = 'Ajouter une formation';
      this.userForm = this.fb.group({
        id: [''],
        title: ['', [Validators.required]],
        company: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['France', [Validators.required]],
        startAt: [''],
        endAt: [''],
      });
    }
  }
  async submit() {
    if (this.updateOrAdd == 'update') {
      const newFormation = {
        ...this.userForm.value,
      };
      newFormation.id = this.formationTochange.id;

      await firstValueFrom(
        this.formationService
          .updateFormation(newFormation)
          .pipe(finalize(() => this.actionEmitter.emit()))
      );
    } else if (this.updateOrAdd == 'add') {
      const newFormation = {
        ...this.userForm.value,
      };
      await firstValueFrom(
        this.formationService
          .addFormation(newFormation)
          .pipe(finalize(() => this.actionEmitter.emit()))
      );
      console.log('form user ', this.userForm.value);
    }
  }
  cancel() {
    this.actionEmitter.emit();
  }
}
