import {
  Component,
  inject,
  OnInit,
  signal,
  computed,
  WritableSignal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UserResponseDTO } from '../../../../shared/Models/user/user';
import { DobToAgePipe } from '../../../../utilities/pipes/dob-to-age.pipe';

@Component({
  selector: 'app-layout-client',
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.scss',
})
export class LayoutClientComponent {
  UserToshow = inject(AuthService).userToDisplay;
  showAge = computed(() => {
    var converter = new DobToAgePipe();
    return converter.transform(this.UserToshow().dateOfBirth) > 0;
  });
  route = inject(ActivatedRoute);
}
