import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { FormationService } from '../../../../services/formation.service';
import { AdresseService } from '../../../../services/adresse.service';
import { AuthService } from '../../../../services/auth.service';
import { UserResponseDTO } from '../../../../shared/Models/user/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-personnal-infos',
  templateUrl: './personnal-infos.component.html',
  styleUrl: './personnal-infos.component.scss',
})
export class PersonnalInfosComponent implements OnInit {
  @Input() key!: string;
  @Input() value!: string;
  @Input() order!: boolean;
  @Input({ required: true }) userToDisplay!: WritableSignal<UserResponseDTO>;
  isVisibleModalAddFormation: boolean = false;
  @Input() isVisibleModalEditPerso: boolean = false;
  isVisibleModalAddAdresse: boolean = false;

  formationService = inject(FormationService);
  adresseService = inject(AdresseService);
  authService = inject(AuthService);

  listFormations = this.formationService.listFormations;
  listAdresses = this.adresseService.listAddresses;

  fullName = computed(
    () => `${this.userToDisplay().firstName} ${this.userToDisplay().lastName}`
  );
  isOwner = computed(
    () => this.userToDisplay().id === this.authService.userConnected().id
  );

  async ngOnInit(): Promise<void> {
    await firstValueFrom(
      this.formationService.getFormations(this.userToDisplay().id)
    );
    await firstValueFrom(
      this.adresseService.getAllAddresses(this.userToDisplay().id)
    );
  }

  hideAddForm() {
    this.isVisibleModalAddFormation = false;
    this.isVisibleModalAddAdresse = false;
  }
  showModalEditFormation() {
    this.isVisibleModalAddFormation = true;
  }
  showModalEditAddresse() {
    this.isVisibleModalAddAdresse = true;
  }
}
