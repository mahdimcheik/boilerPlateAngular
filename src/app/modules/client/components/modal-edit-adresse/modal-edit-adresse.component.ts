import { Component, inject, Input, OnInit } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-edit-adresse',
  templateUrl: './modal-edit-adresse.component.html',
  styleUrl: './modal-edit-adresse.component.scss',
})
export class ModalEditAdresseComponent implements OnInit {
  @Input() adresseTochange!: AdresseDTO;
  selectedType!: AddressDropDown;

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
    this.selectedType = this.typesAdresseList.find(
      (x) => x.id == '' + this.adresseTochange.addressType
    ) ?? {
      id: '1',
      name: 'Domicile',
      value: AddressTypeEnum.Domicile,
    };

    this.userForm = this.fb.group({
      street: [this.adresseTochange.street, [Validators.required]],
      streetNumber: [this.adresseTochange.streetNumber, [Validators.required]],
      streetLine2: [this.adresseTochange.streetLine2],
      postalCode: [this.adresseTochange.postalCode, [Validators.required]],
      city: [this.adresseTochange.city, [Validators.required]],
      addressType: [this.selectedType],
    });
    // this.userForm = new FormGroup({
    // streetNumber: new FormControl<number>(this.adresseTochange.streetNumber, [
    //   Validators.required,
    // ]),
    // street: new FormControl<string>(this.adresseTochange.street, [
    //   Validators.required,
    // ]),
    // streetLine2: new FormControl<string>(this.adresseTochange.streetLine2),
    // city: new FormControl<string>(this.adresseTochange.city, [
    //   Validators.required,
    // ]),
    // postalCode: new FormControl<string>(this.adresseTochange.postalCode, [
    //   Validators.required,
    // ]),
    // addressType: new FormControl<AddressTypeEnum>(
    //   this.adresseTochange.addressType
    // ),
    // });
  }
  async submit() {
    const newAdresse: AdresseDTO = {
      id: this.adresseTochange.id,
      street: this.userForm.value['street'],
      streetNumber: this.userForm.value['streetNumber'],
      streetLine2: this.userForm.value['streetLine2'],
      city: this.userForm.value['city'],
      postalCode: this.userForm.value['postalCode'],
      country: this.adresseTochange.country,
      addressType: (this.userForm.value['addressType'] as AddressDropDown)
        .value,
      state: this.adresseTochange.state,
    };

    await firstValueFrom(this.adresseService.updateAddresse(newAdresse));

    console.log(newAdresse);
  }

  modelchanged() {
    console.log(this.userForm.value);
  }
}
