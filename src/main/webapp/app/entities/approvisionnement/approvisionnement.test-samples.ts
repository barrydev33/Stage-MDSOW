import dayjs from 'dayjs/esm';

import { IApprovisionnement, NewApprovisionnement } from './approvisionnement.model';

export const sampleWithRequiredData: IApprovisionnement = {
  id: 8848,
  date: dayjs('2024-05-30T03:50'),
  quantite: 131,
};

export const sampleWithPartialData: IApprovisionnement = {
  id: 26279,
  date: dayjs('2024-05-30T12:00'),
  quantite: 603,
};

export const sampleWithFullData: IApprovisionnement = {
  id: 5579,
  date: dayjs('2024-05-29T23:33'),
  quantite: 24637,
};

export const sampleWithNewData: NewApprovisionnement = {
  date: dayjs('2024-05-30T11:20'),
  quantite: 10256,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
