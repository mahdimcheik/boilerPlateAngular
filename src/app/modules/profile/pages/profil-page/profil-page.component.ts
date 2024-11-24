import { Component, computed, inject, signal } from '@angular/core';
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
  userToDisplay = this.authService.userToDisplay;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId: string = params['id'] ?? '';
      console.log(userId);

      if (userId !== 'me') {
        this.authService.getprofileById(userId).subscribe((res) => {
          this.userToDisplay.set(res.data);
        });
      } else {
        this.userToDisplay.set(this.authService.userConnected());
      }
    });
  }
}
