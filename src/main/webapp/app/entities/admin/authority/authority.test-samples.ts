import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'c230b2ce-d55b-4942-b0d1-3d04d90a06d4',
};

export const sampleWithPartialData: IAuthority = {
  name: '1ea12427-ecf8-4fdd-900b-dd8cf51ebefc',
};

export const sampleWithFullData: IAuthority = {
  name: 'a1afdc3b-9cfa-4e84-b05a-ba15346870ce',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
