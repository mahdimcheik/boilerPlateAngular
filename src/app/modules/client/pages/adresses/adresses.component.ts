import { Component, inject, OnInit, Signal } from '@angular/core';
import { AdresseService } from '../../../../services/adresse.service';
import { AuthService } from '../../../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { AdresseDTO } from '../../../../shared/Models/adresse';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrl: './adresses.component.scss',
})
export class AdressesComponent implements OnInit {
  addressService = inject(AdresseService);
  userConnected = inject(AuthService).userConnected;
  adressesList: Signal<AdresseDTO[]> = this.addressService.listAddresses;

  async ngOnInit(): Promise<void> {
    await firstValueFrom(
      this.addressService.getAllAddresses(this.userConnected().id)
    );
  }
}
