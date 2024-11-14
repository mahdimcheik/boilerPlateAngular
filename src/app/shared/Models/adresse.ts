export type AdresseDTO = {
  id: string;
  streetNumber: number;
  street: string;
  streetLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: number;
};
export enum addressTypeEnum {
  Domicile = 1,
  Travail = 2,
  Facturation = 3,
  Livraison = 4,
}
