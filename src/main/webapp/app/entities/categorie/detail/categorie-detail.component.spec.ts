import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CategorieDetailComponent } from './categorie-detail.component';

describe('Categorie Management Detail Component', () => {
  let comp: CategorieDetailComponent;
  let fixture: ComponentFixture<CategorieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CategorieDetailComponent,
              resolve: { categorie: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CategorieDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load categorie on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CategorieDetailComponent);

      // THEN
      expect(instance.categorie()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
