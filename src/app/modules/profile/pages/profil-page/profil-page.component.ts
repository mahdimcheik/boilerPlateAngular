import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserResponseDTO } from '../../../../shared/Models/user/user';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrl: './profil-page.component.scss',
})
export class ProfilPageComponent {
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
