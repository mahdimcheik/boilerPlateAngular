import { Pipe, PipeTransform } from '@angular/core';
import { addressTypeEnum } from '../../shared/Models/adresse';

@Pipe({
  name: 'adresseType',
})
export class AdresseTypePipe implements PipeTransform {
  transform(adresseTypeNumber: number): string {
    switch (adresseTypeNumber) {
      case addressTypeEnum.Domicile:
        return 'Domicile';
      case addressTypeEnum.Travail:
        return 'Travail';
      case addressTypeEnum.Facturation:
        return 'Facturation';
      case addressTypeEnum.Livraison:
        return 'Livraison';
      default:
        return 'Non défini';
    }
  }
}
