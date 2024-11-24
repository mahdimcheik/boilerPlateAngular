import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UserResponseDTO } from '../../../../shared/Models/user/user';

@Component({
  selector: 'app-layout-client',
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.scss',
})
export class LayoutClientComponent {
  UserToshow = inject(AuthService).userToDisplay;
  route = inject(ActivatedRoute);
}
