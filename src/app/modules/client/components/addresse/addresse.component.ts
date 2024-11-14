import { Component, Input, OnInit } from '@angular/core';
import { AdresseDTO } from '../../../../shared/Models/adresse';

@Component({
  selector: 'app-addresse',
  templateUrl: './addresse.component.html',
  styleUrl: './addresse.component.scss',
})
export class AddresseComponent implements OnInit {
  @Input() adresse!: AdresseDTO;
  @Input() editModeOn: boolean = true;

  classIcon!: string;

  isVisibleFormEditCourse = false;
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

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm() {
    this.isVisibleFormEditCourse = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }

  editForm(adresse: AdresseDTO) {
    this.isVisibleFormEditCourse = false;
  }
}
