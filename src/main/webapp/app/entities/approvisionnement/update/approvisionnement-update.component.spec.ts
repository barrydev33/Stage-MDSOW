import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/service/fournisseur.service';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';
import { IApprovisionnement } from '../approvisionnement.model';
import { ApprovisionnementService } from '../service/approvisionnement.service';
import { ApprovisionnementFormService } from './approvisionnement-form.service';

import { ApprovisionnementUpdateComponent } from './approvisionnement-update.component';

describe('Approvisionnement Management Update Component', () => {
  let comp: ApprovisionnementUpdateComponent;
  let fixture: ComponentFixture<ApprovisionnementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let approvisionnementFormService: ApprovisionnementFormService;
  let approvisionnementService: ApprovisionnementService;
  let fournisseurService: FournisseurService;
  let produitService: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApprovisionnementUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ApprovisionnementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApprovisionnementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    approvisionnementFormService = TestBed.inject(ApprovisionnementFormService);
    approvisionnementService = TestBed.inject(ApprovisionnementService);
    fournisseurService = TestBed.inject(FournisseurService);
    produitService = TestBed.inject(ProduitService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Fournisseur query and add missing value', () => {
      const approvisionnement: IApprovisionnement = { id: 456 };
      const fournisseur: IFournisseur = { id: 20886 };
      approvisionnement.fournisseur = fournisseur;

      const fournisseurCollection: IFournisseur[] = [{ id: 27143 }];
      jest.spyOn(fournisseurService, 'query').mockReturnValue(of(new HttpResponse({ body: fournisseurCollection })));
      const additionalFournisseurs = [fournisseur];
      const expectedCollection: IFournisseur[] = [...additionalFournisseurs, ...fournisseurCollection];
      jest.spyOn(fournisseurService, 'addFournisseurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ approvisionnement });
      comp.ngOnInit();

      expect(fournisseurService.query).toHaveBeenCalled();
      expect(fournisseurService.addFournisseurToCollectionIfMissing).toHaveBeenCalledWith(
        fournisseurCollection,
        ...additionalFournisseurs.map(expect.objectContaining),
      );
      expect(comp.fournisseursSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Produit query and add missing value', () => {
      const approvisionnement: IApprovisionnement = { id: 456 };
      const produit: IProduit = { id: 7821 };
      approvisionnement.produit = produit;

      const produitCollection: IProduit[] = [{ id: 25379 }];
      jest.spyOn(produitService, 'query').mockReturnValue(of(new HttpResponse({ body: produitCollection })));
      const additionalProduits = [produit];
      const expectedCollection: IProduit[] = [...additionalProduits, ...produitCollection];
      jest.spyOn(produitService, 'addProduitToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ approvisionnement });
      comp.ngOnInit();

      expect(produitService.query).toHaveBeenCalled();
      expect(produitService.addProduitToCollectionIfMissing).toHaveBeenCalledWith(
        produitCollection,
        ...additionalProduits.map(expect.objectContaining),
      );
      expect(comp.produitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const approvisionnement: IApprovisionnement = { id: 456 };
      const fournisseur: IFournisseur = { id: 24975 };
      approvisionnement.fournisseur = fournisseur;
      const produit: IProduit = { id: 11580 };
      approvisionnement.produit = produit;

      activatedRoute.data = of({ approvisionnement });
      comp.ngOnInit();

      expect(comp.fournisseursSharedCollection).toContain(fournisseur);
      expect(comp.produitsSharedCollection).toContain(produit);
      expect(comp.approvisionnement).toEqual(approvisionnement);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovisionnement>>();
      const approvisionnement = { id: 123 };
      jest.spyOn(approvisionnementFormService, 'getApprovisionnement').mockReturnValue(approvisionnement);
      jest.spyOn(approvisionnementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvisionnement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: approvisionnement }));
      saveSubject.complete();

      // THEN
      expect(approvisionnementFormService.getApprovisionnement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(approvisionnementService.update).toHaveBeenCalledWith(expect.objectContaining(approvisionnement));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovisionnement>>();
      const approvisionnement = { id: 123 };
      jest.spyOn(approvisionnementFormService, 'getApprovisionnement').mockReturnValue({ id: null });
      jest.spyOn(approvisionnementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvisionnement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: approvisionnement }));
      saveSubject.complete();

      // THEN
      expect(approvisionnementFormService.getApprovisionnement).toHaveBeenCalled();
      expect(approvisionnementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovisionnement>>();
      const approvisionnement = { id: 123 };
      jest.spyOn(approvisionnementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvisionnement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(approvisionnementService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFournisseur', () => {
      it('Should forward to fournisseurService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(fournisseurService, 'compareFournisseur');
        comp.compareFournisseur(entity, entity2);
        expect(fournisseurService.compareFournisseur).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduit', () => {
      it('Should forward to produitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(produitService, 'compareProduit');
        comp.compareProduit(entity, entity2);
        expect(produitService.compareProduit).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
