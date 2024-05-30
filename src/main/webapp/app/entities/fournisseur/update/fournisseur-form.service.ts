import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFournisseur, NewFournisseur } from '../fournisseur.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFournisseur for edit and NewFournisseurFormGroupInput for create.
 */
type FournisseurFormGroupInput = IFournisseur | PartialWithRequiredKeyOf<NewFournisseur>;

type FournisseurFormDefaults = Pick<NewFournisseur, 'id'>;

type FournisseurFormGroupContent = {
  id: FormControl<IFournisseur['id'] | NewFournisseur['id']>;
  nom: FormControl<IFournisseur['nom']>;
  adresse: FormControl<IFournisseur['adresse']>;
  contact: FormControl<IFournisseur['contact']>;
  profil: FormControl<IFournisseur['profil']>;
  profilContentType: FormControl<IFournisseur['profilContentType']>;
};

export type FournisseurFormGroup = FormGroup<FournisseurFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FournisseurFormService {
  createFournisseurFormGroup(fournisseur: FournisseurFormGroupInput = { id: null }): FournisseurFormGroup {
    const fournisseurRawValue = {
      ...this.getFormDefaults(),
      ...fournisseur,
    };
    return new FormGroup<FournisseurFormGroupContent>({
      id: new FormControl(
        { value: fournisseurRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nom: new FormControl(fournisseurRawValue.nom, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      adresse: new FormControl(fournisseurRawValue.adresse, {
        validators: [Validators.required],
      }),
      contact: new FormControl(fournisseurRawValue.contact, {
        validators: [Validators.required],
      }),
      profil: new FormControl(fournisseurRawValue.profil),
      profilContentType: new FormControl(fournisseurRawValue.profilContentType),
    });
  }

  getFournisseur(form: FournisseurFormGroup): IFournisseur | NewFournisseur {
    return form.getRawValue() as IFournisseur | NewFournisseur;
  }

  resetForm(form: FournisseurFormGroup, fournisseur: FournisseurFormGroupInput): void {
    const fournisseurRawValue = { ...this.getFormDefaults(), ...fournisseur };
    form.reset(
      {
        ...fournisseurRawValue,
        id: { value: fournisseurRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FournisseurFormDefaults {
    return {
      id: null,
    };
  }
}
