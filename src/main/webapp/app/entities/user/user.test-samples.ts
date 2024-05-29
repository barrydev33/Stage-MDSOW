import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 10813,
  login: 'yZ-',
};

export const sampleWithPartialData: IUser = {
  id: 18392,
  login: '4eLEh',
};

export const sampleWithFullData: IUser = {
  id: 5868,
  login: 'uv',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
