import { IFournisseur, NewFournisseur } from './fournisseur.model';

export const sampleWithRequiredData: IFournisseur = {
  id: 17483,
  nom: 'hé crac',
  adresse: 'insolite',
  contact: "à l'égard de membre à vie porte-parole",
};

export const sampleWithPartialData: IFournisseur = {
  id: 4223,
  nom: 'malgré quitte à pacifique',
  adresse: 'tirer',
  contact: 'désagréable ouf de crainte que',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithFullData: IFournisseur = {
  id: 15545,
  nom: 'drôlement géométrique',
  adresse: 'grâce à en dehors de pin-pon',
  contact: 'sédentaire',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
  age: 4338,
};

export const sampleWithNewData: NewFournisseur = {
  nom: 'juriste boum',
  adresse: 'au dépens de guère sauvage',
  contact: 'gouverner',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
