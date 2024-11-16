import { Component, inject, Input, OnInit } from '@angular/core';
import { AdresseDTO } from '../../../../shared/Models/adresse';
import { AdresseService } from '../../../../services/adresse.service';
import { finalize, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-addresse',
  templateUrl: './addresse.component.html',
  styleUrl: './addresse.component.scss',
})
export class AddresseComponent implements OnInit {
  @Input() adresse!: AdresseDTO;
  @Input() editModeOn: boolean = true;
  adresseService = inject(AdresseService);

  classIcon!: string;

  isVisibleFormEditFormation = false;
  popupDeleteVisible = false;

  ngOnInit(): void {
    switch (this.adresse.addressType) {
      case 1: {
        this.classIcon = 'pi-home';
        break;
      }
      case 2: {
        this.classIcon = 'pi-briefcase';
        break;
      }
      case 3: {
        this.classIcon = 'pi-money-bill';
        break;
      }
      case 4: {
        this.classIcon = 'pi-send';
        break;
      }
    }
  }

  async deleteAdresse() {
    await firstValueFrom(
      this.adresseService
        .deleteAddresse(this.adresse.id)
        .pipe(finalize(() => this.hidePopUpDelete()))
    );
  }

  showEditForm() {
    this.isVisibleFormEditFormation = true;
  }

  hideEditForm() {
    this.isVisibleFormEditFormation = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }
  hidePopUpDelete() {
    this.popupDeleteVisible = false;
  }

  editForm(adresse: AdresseDTO) {
    this.isVisibleFormEditFormation = false;
  }
}
