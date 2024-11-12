import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-personnal-infos',
  templateUrl: './personnal-infos.component.html',
  styleUrl: './personnal-infos.component.scss',
})
export class PersonnalInfosComponent {
  @Input() key!: string;
  @Input() value!: string;
  @Input() order!: boolean;
}
