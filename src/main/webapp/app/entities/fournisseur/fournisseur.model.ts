export interface IFournisseur {
  id: number;
  nom?: string | null;
  adresse?: string | null;
  contact?: string | null;
  profil?: string | null;
  profilContentType?: string | null;
}

export type NewFournisseur = Omit<IFournisseur, 'id'> & { id: null };
