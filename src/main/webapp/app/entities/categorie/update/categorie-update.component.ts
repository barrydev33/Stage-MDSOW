import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICategorie } from '../categorie.model';
import { CategorieService } from '../service/categorie.service';
import { CategorieFormService, CategorieFormGroup } from './categorie-form.service';

@Component({
  standalone: true,
  selector: 'jhi-categorie-update',
  templateUrl: './categorie-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CategorieUpdateComponent implements OnInit {
  isSaving = false;
  categorie: ICategorie | null = null;

  protected categorieService = inject(CategorieService);
  protected categorieFormService = inject(CategorieFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CategorieFormGroup = this.categorieFormService.createCategorieFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      this.categorie = categorie;
      if (categorie) {
        this.updateForm(categorie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categorie = this.categorieFormService.getCategorie(this.editForm);
    if (categorie.id !== null) {
      this.subscribeToSaveResponse(this.categorieService.update(categorie));
    } else {
      this.subscribeToSaveResponse(this.categorieService.create(categorie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorie>>): void {
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

  protected updateForm(categorie: ICategorie): void {
    this.categorie = categorie;
    this.categorieFormService.resetForm(this.editForm, categorie);
  }
}
