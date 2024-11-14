import { Component, computed, inject, input, Input } from '@angular/core';
import { FormationResponseDTO } from '../../../../shared/Models/formation';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-personnal-infos',
  templateUrl: './personnal-infos.component.html',
  styleUrl: './personnal-infos.component.scss',
})
export class PersonnalInfosComponent {
  @Input() key!: string;
  @Input() value!: string;
  @Input() order!: boolean;

  userConnected = inject(AuthService).userConnected;
  fullName = computed(
    () => `${this.userConnected().firstName} ${this.userConnected().lastName}`
  );

  formation1: FormationResponseDTO = {
    id: '11',
    title: 'Formation DWWM',
    company: 'Beecoming',
    dateBegin: '2024-12-15',
    dateEnd: '2024-12-15',
    city: 'Bordeaux',
    country: 'France',
  };
  formation2: FormationResponseDTO = {
    id: '10',
    title: 'Formation DWWM',
    company: 'Beecoming',
    dateBegin: '2024-12-15',
    dateEnd: '2024-12-15',
    city: 'Bordeaux',
    country: 'France',
  };
  run() {
    console.log('runner');
  }
}
