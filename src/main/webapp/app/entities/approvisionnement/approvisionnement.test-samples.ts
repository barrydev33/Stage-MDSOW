import dayjs from 'dayjs/esm';

import { IApprovisionnement, NewApprovisionnement } from './approvisionnement.model';

export const sampleWithRequiredData: IApprovisionnement = {
  id: 7773,
  date: dayjs('2024-05-30T11:35'),
  quantite: 6839,
};

export const sampleWithPartialData: IApprovisionnement = {
  id: 25117,
  date: dayjs('2024-05-30T05:22'),
  quantite: 23136,
};

export const sampleWithFullData: IApprovisionnement = {
  id: 22792,
  date: dayjs('2024-05-29T19:34'),
  quantite: 13083,
};

export const sampleWithNewData: NewApprovisionnement = {
  date: dayjs('2024-05-30T08:34'),
  quantite: 9854,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
