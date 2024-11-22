import {
  Component,
  computed,
  inject,
  input,
  Input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormationResponseDTO } from '../../../../shared/Models/formation';
import { AuthService } from '../../../../services/auth.service';
import { FormationService } from '../../../../services/formation.service';
import { firstValueFrom } from 'rxjs';
import { AdresseService } from '../../../../services/adresse.service';
import { UserResponseDTO } from '../../../../shared/Models/user/user';

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

  run() {}

  hideAddForm() {
    this.isVisibleModalAddFormation = false;
  }
  showModalEditFormation() {
    this.isVisibleModalAddFormation = true;
  }
}
