import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  async ngOnInit() {
    try {
      await firstValueFrom(this.authService.getprofile());
    } catch {
      this.authService.reset();
    }
  }
}
