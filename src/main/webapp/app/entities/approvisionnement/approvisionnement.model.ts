import dayjs from 'dayjs/esm';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { IProduit } from 'app/entities/produit/produit.model';

export interface IApprovisionnement {
  id: number;
  date?: dayjs.Dayjs | null;
  quantite?: number | null;
  fournisseur?: Pick<IFournisseur, 'id' | 'nom'> | null;
  produit?: Pick<IProduit, 'id' | 'nom'> | null;
}

export type NewApprovisionnement = Omit<IApprovisionnement, 'id'> & { id: null };
