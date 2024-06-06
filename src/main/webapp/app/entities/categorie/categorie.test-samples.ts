import { ICategorie, NewCategorie } from './categorie.model';

export const sampleWithRequiredData: ICategorie = {
  id: 21426,
  nom: 'au défaut de plutôt',
  description: 'quand ouah membre titulaire',
};

export const sampleWithPartialData: ICategorie = {
  id: 2850,
  nom: 'population du Québec de façon à camarade',
  description: 'conseil d’administration novice',
};

export const sampleWithFullData: ICategorie = {
  id: 24770,
  nom: 'mal amorphe simple',
  description: 'sous',
};

export const sampleWithNewData: NewCategorie = {
  nom: 'en dehors de',
  description: 'extra',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
