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
export class LayoutClientComponent implements OnInit {
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  UserToshow = signal<UserResponseDTO>({} as UserResponseDTO); //= this.authService.userConnected;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId: string = params['id'] ?? '';
      console.log(userId);

      if (userId !== 'me') {
        this.authService.getprofileById(userId).subscribe((res) => {
          this.UserToshow.set(res.data);
        });
      } else {
        this.UserToshow.set(this.authService.userConnected());
      }
    });
  }
}
