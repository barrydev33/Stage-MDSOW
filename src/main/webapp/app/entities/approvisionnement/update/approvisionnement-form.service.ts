import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IApprovisionnement, NewApprovisionnement } from '../approvisionnement.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApprovisionnement for edit and NewApprovisionnementFormGroupInput for create.
 */
type ApprovisionnementFormGroupInput = IApprovisionnement | PartialWithRequiredKeyOf<NewApprovisionnement>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IApprovisionnement | NewApprovisionnement> = Omit<T, 'date'> & {
  date?: string | null;
};

type ApprovisionnementFormRawValue = FormValueOf<IApprovisionnement>;

type NewApprovisionnementFormRawValue = FormValueOf<NewApprovisionnement>;

type ApprovisionnementFormDefaults = Pick<NewApprovisionnement, 'id' | 'date'>;

type ApprovisionnementFormGroupContent = {
  id: FormControl<ApprovisionnementFormRawValue['id'] | NewApprovisionnement['id']>;
  date: FormControl<ApprovisionnementFormRawValue['date']>;
  quantite: FormControl<ApprovisionnementFormRawValue['quantite']>;
  fournisseur: FormControl<ApprovisionnementFormRawValue['fournisseur']>;
  produit: FormControl<ApprovisionnementFormRawValue['produit']>;
};

export type ApprovisionnementFormGroup = FormGroup<ApprovisionnementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApprovisionnementFormService {
  createApprovisionnementFormGroup(approvisionnement: ApprovisionnementFormGroupInput = { id: null }): ApprovisionnementFormGroup {
    const approvisionnementRawValue = this.convertApprovisionnementToApprovisionnementRawValue({
      ...this.getFormDefaults(),
      ...approvisionnement,
    });
    return new FormGroup<ApprovisionnementFormGroupContent>({
      id: new FormControl(
        { value: approvisionnementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      date: new FormControl(approvisionnementRawValue.date, {
        validators: [Validators.required],
      }),
      quantite: new FormControl(approvisionnementRawValue.quantite, {
        validators: [Validators.required],
      }),
      fournisseur: new FormControl(approvisionnementRawValue.fournisseur),
      produit: new FormControl(approvisionnementRawValue.produit),
    });
  }

  getApprovisionnement(form: ApprovisionnementFormGroup): IApprovisionnement | NewApprovisionnement {
    return this.convertApprovisionnementRawValueToApprovisionnement(
      form.getRawValue() as ApprovisionnementFormRawValue | NewApprovisionnementFormRawValue,
    );
  }

  resetForm(form: ApprovisionnementFormGroup, approvisionnement: ApprovisionnementFormGroupInput): void {
    const approvisionnementRawValue = this.convertApprovisionnementToApprovisionnementRawValue({
      ...this.getFormDefaults(),
      ...approvisionnement,
    });
    form.reset(
      {
        ...approvisionnementRawValue,
        id: { value: approvisionnementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ApprovisionnementFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertApprovisionnementRawValueToApprovisionnement(
    rawApprovisionnement: ApprovisionnementFormRawValue | NewApprovisionnementFormRawValue,
  ): IApprovisionnement | NewApprovisionnement {
    return {
      ...rawApprovisionnement,
      date: dayjs(rawApprovisionnement.date, DATE_TIME_FORMAT),
    };
  }

  private convertApprovisionnementToApprovisionnementRawValue(
    approvisionnement: IApprovisionnement | (Partial<NewApprovisionnement> & ApprovisionnementFormDefaults),
  ): ApprovisionnementFormRawValue | PartialWithRequiredKeyOf<NewApprovisionnementFormRawValue> {
    return {
      ...approvisionnement,
      date: approvisionnement.date ? approvisionnement.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
