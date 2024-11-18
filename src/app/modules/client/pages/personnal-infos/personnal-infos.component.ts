import {
  Component,
  computed,
  inject,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { FormationResponseDTO } from '../../../../shared/Models/formation';
import { AuthService } from '../../../../services/auth.service';
import { FormationService } from '../../../../services/formation.service';
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
  isVisibleModalAddFormation: boolean = false;
  @Input() isVisibleModalEditPerso: boolean = false;

  userConnected = inject(AuthService).userConnected;
  formationService = inject(FormationService);
  listFormations = this.formationService.listFormations;
  fullName = computed(
    () => `${this.userConnected().firstName} ${this.userConnected().lastName}`
  );

  async ngOnInit(): Promise<void> {
    await firstValueFrom(
      this.formationService.getFormations(this.userConnected().id)
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
