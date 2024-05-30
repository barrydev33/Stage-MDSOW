import { ICategorie } from 'app/entities/categorie/categorie.model';

export interface IProduit {
  id: number;
  nom?: string | null;
  prix?: number | null;
  categorie?: Pick<ICategorie, 'id' | 'description'> | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
