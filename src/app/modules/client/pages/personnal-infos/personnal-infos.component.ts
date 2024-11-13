import { Component, input, Input } from '@angular/core';
import { FormationResponseDTO } from '../../../../shared/Models/formation';

@Component({
  selector: 'app-personnal-infos',
  templateUrl: './personnal-infos.component.html',
  styleUrl: './personnal-infos.component.scss',
})
export class PersonnalInfosComponent {
  @Input() key!: string;
  @Input() value!: string;
  @Input() order!: boolean;

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
}
