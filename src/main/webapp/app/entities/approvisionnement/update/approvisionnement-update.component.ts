import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/service/fournisseur.service';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';
import { ApprovisionnementService } from '../service/approvisionnement.service';
import { IApprovisionnement } from '../approvisionnement.model';
import { ApprovisionnementFormService, ApprovisionnementFormGroup } from './approvisionnement-form.service';

@Component({
  standalone: true,
  selector: 'jhi-approvisionnement-update',
  templateUrl: './approvisionnement-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ApprovisionnementUpdateComponent implements OnInit {
  isSaving = false;
  approvisionnement: IApprovisionnement | null = null;

  fournisseursSharedCollection: IFournisseur[] = [];
  produitsSharedCollection: IProduit[] = [];

  protected approvisionnementService = inject(ApprovisionnementService);
  protected approvisionnementFormService = inject(ApprovisionnementFormService);
  protected fournisseurService = inject(FournisseurService);
  protected produitService = inject(ProduitService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ApprovisionnementFormGroup = this.approvisionnementFormService.createApprovisionnementFormGroup();

  compareFournisseur = (o1: IFournisseur | null, o2: IFournisseur | null): boolean => this.fournisseurService.compareFournisseur(o1, o2);

  compareProduit = (o1: IProduit | null, o2: IProduit | null): boolean => this.produitService.compareProduit(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ approvisionnement }) => {
      this.approvisionnement = approvisionnement;
      if (approvisionnement) {
        this.updateForm(approvisionnement);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const approvisionnement = this.approvisionnementFormService.getApprovisionnement(this.editForm);
    if (approvisionnement.id !== null) {
      this.subscribeToSaveResponse(this.approvisionnementService.update(approvisionnement));
    } else {
      this.subscribeToSaveResponse(this.approvisionnementService.create(approvisionnement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApprovisionnement>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(approvisionnement: IApprovisionnement): void {
    this.approvisionnement = approvisionnement;
    this.approvisionnementFormService.resetForm(this.editForm, approvisionnement);

    this.fournisseursSharedCollection = this.fournisseurService.addFournisseurToCollectionIfMissing<IFournisseur>(
      this.fournisseursSharedCollection,
      approvisionnement.fournisseur,
    );
    this.produitsSharedCollection = this.produitService.addProduitToCollectionIfMissing<IProduit>(
      this.produitsSharedCollection,
      approvisionnement.produit,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fournisseurService
      .query()
      .pipe(map((res: HttpResponse<IFournisseur[]>) => res.body ?? []))
      .pipe(
        map((fournisseurs: IFournisseur[]) =>
          this.fournisseurService.addFournisseurToCollectionIfMissing<IFournisseur>(fournisseurs, this.approvisionnement?.fournisseur),
        ),
      )
      .subscribe((fournisseurs: IFournisseur[]) => (this.fournisseursSharedCollection = fournisseurs));

    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduit[]>) => res.body ?? []))
      .pipe(
        map((produits: IProduit[]) =>
          this.produitService.addProduitToCollectionIfMissing<IProduit>(produits, this.approvisionnement?.produit),
        ),
      )
      .subscribe((produits: IProduit[]) => (this.produitsSharedCollection = produits));
  }
}
