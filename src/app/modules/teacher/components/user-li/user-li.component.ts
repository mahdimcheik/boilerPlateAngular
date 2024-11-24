import { Component, Input } from '@angular/core';
import { UserResponseDTO } from '../../../../shared/Models/user/user';

@Component({
  selector: 'app-user-li',
  templateUrl: './user-li.component.html',
  styleUrl: './user-li.component.scss',
})
export class UserLiComponent {
  @Input() user!: UserResponseDTO;
}
