import { ICategorie, NewCategorie } from './categorie.model';

export const sampleWithRequiredData: ICategorie = {
  id: 21380,
  nom: 'direction aigre',
  description: 'toc-toc un peu',
};

export const sampleWithPartialData: ICategorie = {
  id: 32738,
  nom: 'lorsque prout calme',
  description: 'au cas où sale',
};

export const sampleWithFullData: ICategorie = {
  id: 23143,
  nom: 'apparemment',
  description: 'dès que sitôt que au-dessous de',
};

export const sampleWithNewData: NewCategorie = {
  nom: 'complètement',
  description: 'neutre hi',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
