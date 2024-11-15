import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AddressDropDown,
  AddressTypeEnum,
  AdresseDTO,
} from '../../../../shared/Models/adresse';
import { AdresseService } from '../../../../services/adresse.service';
import { finalize, firstValueFrom } from 'rxjs';
/// same component is used to add or update an address
@Component({
  selector: 'app-modal-edit-adresse',
  templateUrl: './modal-edit-adresse.component.html',
  styleUrl: './modal-edit-adresse.component.scss',
})
export class ModalEditAdresseComponent implements OnInit {
  @Input() adresseTochange!: AdresseDTO;
  @Input() updateOrAdd: 'update' | 'add' = 'update';
  @Output() actionEmitter = new EventEmitter<void>();
  selectedType!: AddressDropDown;
  title!: string;

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  adresseService = inject(AdresseService);

  typesAdresseList: AddressDropDown[] = [
    {
      id: '1',
      name: 'Domicile',
      value: AddressTypeEnum.Domicile,
    },
    {
      id: '2',
      name: 'Travail',
      value: AddressTypeEnum.Travail,
    },
    {
      id: '3',
      name: 'Facturation',
      value: AddressTypeEnum.Facturation,
    },
    {
      id: '4',
      name: 'Livraison',
      value: AddressTypeEnum.Livraison,
    },
  ];

  userForm!: FormGroup;

  ngOnInit(): void {
    if (this.updateOrAdd == 'update') {
      // pour primeng drop down options
      this.title = "Editer l'adresse suivante";
      this.selectedType = this.typesAdresseList.find(
        (x) => x.id == '' + this.adresseTochange.addressType
      ) ?? {
        id: '1',
        name: 'Domicile',
        value: AddressTypeEnum.Domicile,
      };

      this.userForm = this.fb.group({
        street: [this.adresseTochange.street, [Validators.required]],
        streetNumber: [
          this.adresseTochange.streetNumber,
          [Validators.required],
        ],
        streetLine2: [this.adresseTochange.streetLine2],
        postalCode: [this.adresseTochange.postalCode, [Validators.required]],
        city: [this.adresseTochange.city, [Validators.required]],
        addressType: [this.selectedType],
        country: [this.adresseTochange.country],
        state: [this.adresseTochange.state],
      });
    } else if (this.updateOrAdd == 'add') {
      this.title = 'Ajouter une adresse';

      this.selectedType = {
        id: '1',
        name: 'Domicile',
        value: AddressTypeEnum.Domicile,
      };

      this.userForm = this.fb.group({
        street: ['', [Validators.required]],
        streetNumber: [1, [Validators.required]],
        streetLine2: [''],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]],
        addressType: [this.selectedType],
        country: ['France'],
        state: [''],
      });
    }
  }
  async submit() {
    if (this.updateOrAdd == 'update') {
      const newAdresse = {
        ...this.userForm.value,
        addressType: this.userForm.value['addressType'].value,
        id: this.adresseTochange.id,
      };

      this.actionEmitter.emit();
      await firstValueFrom(
        this.adresseService
          .updateAddresse(newAdresse)
          .pipe(finalize(() => this.actionEmitter.emit()))
      );
    } else if (this.updateOrAdd == 'add') {
      const newAdresse = {
        ...this.userForm.value,
        addressType: this.userForm.value['addressType'].value,
      };

      this.actionEmitter.emit();
      await firstValueFrom(
        this.adresseService
          .addAddresse(newAdresse)
          .pipe(finalize(() => this.actionEmitter.emit()))
      );
    }
  }
  cancel() {
    this.actionEmitter.emit();
  }
}
