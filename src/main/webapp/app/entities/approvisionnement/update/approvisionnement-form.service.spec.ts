import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../approvisionnement.test-samples';

import { ApprovisionnementFormService } from './approvisionnement-form.service';

describe('Approvisionnement Form Service', () => {
  let service: ApprovisionnementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovisionnementFormService);
  });

  describe('Service methods', () => {
    describe('createApprovisionnementFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApprovisionnementFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            quantite: expect.any(Object),
            fournisseur: expect.any(Object),
            produit: expect.any(Object),
          }),
        );
      });

      it('passing IApprovisionnement should create a new form with FormGroup', () => {
        const formGroup = service.createApprovisionnementFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            quantite: expect.any(Object),
            fournisseur: expect.any(Object),
            produit: expect.any(Object),
          }),
        );
      });
    });

    describe('getApprovisionnement', () => {
      it('should return NewApprovisionnement for default Approvisionnement initial value', () => {
        const formGroup = service.createApprovisionnementFormGroup(sampleWithNewData);

        const approvisionnement = service.getApprovisionnement(formGroup) as any;

        expect(approvisionnement).toMatchObject(sampleWithNewData);
      });

      it('should return NewApprovisionnement for empty Approvisionnement initial value', () => {
        const formGroup = service.createApprovisionnementFormGroup();

        const approvisionnement = service.getApprovisionnement(formGroup) as any;

        expect(approvisionnement).toMatchObject({});
      });

      it('should return IApprovisionnement', () => {
        const formGroup = service.createApprovisionnementFormGroup(sampleWithRequiredData);

        const approvisionnement = service.getApprovisionnement(formGroup) as any;

        expect(approvisionnement).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApprovisionnement should not enable id FormControl', () => {
        const formGroup = service.createApprovisionnementFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApprovisionnement should disable id FormControl', () => {
        const formGroup = service.createApprovisionnementFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
