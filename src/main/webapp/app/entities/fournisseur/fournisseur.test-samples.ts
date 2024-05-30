import { IFournisseur, NewFournisseur } from './fournisseur.model';

export const sampleWithRequiredData: IFournisseur = {
  id: 24137,
  nom: 'même si exprès',
  adresse: 'perplexe guider',
  contact: 'altruiste',
};

export const sampleWithPartialData: IFournisseur = {
  id: 12958,
  nom: 'de crainte que en au point que',
  adresse: 'enfiler minuscule',
  contact: 'boire',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithFullData: IFournisseur = {
  id: 18816,
  nom: 'reporter',
  adresse: 'vivace',
  contact: 'bien que',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithNewData: NewFournisseur = {
  nom: 'en bas de toc-toc',
  adresse: 'partager maintenant auprès de',
  contact: 'orange affranchir moins',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
