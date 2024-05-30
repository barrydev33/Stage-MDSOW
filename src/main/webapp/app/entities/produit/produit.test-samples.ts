import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 11849,
  nom: 'triangulaire enfiler expliquer',
};

export const sampleWithPartialData: IProduit = {
  id: 6841,
  nom: 'corps enseignant',
};

export const sampleWithFullData: IProduit = {
  id: 4161,
  nom: 'au-dessus de',
  prix: 1402.92,
};

export const sampleWithNewData: NewProduit = {
  nom: 'à côté de lire ouch',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
