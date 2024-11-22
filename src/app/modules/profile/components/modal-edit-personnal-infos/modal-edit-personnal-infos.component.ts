import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EnumGender,
  GenderDropDown,
  UserCreateDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from '../../../../shared/Models/user/user';
import { AuthService } from '../../../../services/auth.service';
import { catchError, firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-modal-edit-personnal-infos',
  templateUrl: './modal-edit-personnal-infos.component.html',
  styleUrl: './modal-edit-personnal-infos.component.scss',
})
export class ModalEditPersonnalInfosComponent {
  @Input() user!: UserResponseDTO;
  @Output() actionEmitter = new EventEmitter<void>();
  @Input() visible: boolean = false;
  selectedGender!: GenderDropDown;
  @Input() title!: string;

  file?: File;
  fileName?: string;

  authService = inject(AuthService);
  fb = inject(FormBuilder);

  typesGenderList = [
    {
      id: '0',
      name: 'Homme',
      value: EnumGender.Homme,
    },
    {
      id: '1',
      name: 'Femme',
      value: EnumGender.Femme,
    },
    {
      id: '2',
      name: 'Non-binaire',
      value: EnumGender.NonBinaire,
    },
    {
      id: '3',
      name: 'Autre',
      value: EnumGender.Autre,
    },
  ];

  userForm!: FormGroup;

  ngOnInit(): void {
    this.selectedGender =
      this.typesGenderList.find((x) => x.value == this.user.gender) ??
      this.typesGenderList[3];

    this.userForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      dateOfBirth: [new Date(this.user.dateOfBirth), [Validators.required]],
      gender: [this.selectedGender],
      title: [this.user.title],
    });
  }
  async submit() {
    const newUser = {
      ...this.user,
      firstName: this.userForm.value['firstName'],
      lastName: this.userForm.value['lastName'],
      dateOfBirth: this.userForm.value['dateOfBirth'],
      gender: this.userForm.value['gender'].value,
      title: this.userForm.value['title']
        ? this.userForm.value['title']
        : this.user.title,
    };

    if (this.fileName && this.file != null) {
      await firstValueFrom(this.authService.updateAvatar(this.file));
    }

    await firstValueFrom(
      this.authService.updatePersonnalInfos(newUser as UserUpdateDTO)
    );

    this.actionEmitter.emit();
  }
  cancel() {
    this.actionEmitter.emit();
  }
  genderChosen() {}

  receiveFile(event: { file: File; fileName: string }) {
    this.file = event.file;
    this.fileName = event.fileName;
  }
}
