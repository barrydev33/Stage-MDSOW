import { IFournisseur, NewFournisseur } from './fournisseur.model';

export const sampleWithRequiredData: IFournisseur = {
  id: 11504,
  nom: 'délégation au lieu de',
  adresse: 'hisser',
  contact: 'boum fonctionnaire',
};

export const sampleWithPartialData: IFournisseur = {
  id: 143,
  nom: 'sitôt que athlète',
  adresse: 'chef de cuisine',
  contact: 'pacifique auprès de groin groin',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithFullData: IFournisseur = {
  id: 30301,
  nom: 'ouf',
  adresse: 'ha ha suivant perplexe',
  contact: 'poser infiniment',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithNewData: NewFournisseur = {
  nom: 'pin-pon super clac',
  adresse: "présidence prout d'abord",
  contact: 'clientèle bè solitaire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
