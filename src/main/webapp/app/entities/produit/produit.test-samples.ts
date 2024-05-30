import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 10494,
  nom: 'multiple dring',
};

export const sampleWithPartialData: IProduit = {
  id: 3060,
  nom: 'à peine par',
  prix: 26469.14,
};

export const sampleWithFullData: IProduit = {
  id: 23981,
  nom: 'malade quitte à',
  prix: 31275.79,
};

export const sampleWithNewData: NewProduit = {
  nom: 'lors de',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
