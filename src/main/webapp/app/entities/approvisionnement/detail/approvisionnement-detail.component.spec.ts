import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ApprovisionnementDetailComponent } from './approvisionnement-detail.component';

describe('Approvisionnement Management Detail Component', () => {
  let comp: ApprovisionnementDetailComponent;
  let fixture: ComponentFixture<ApprovisionnementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovisionnementDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ApprovisionnementDetailComponent,
              resolve: { approvisionnement: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ApprovisionnementDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovisionnementDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load approvisionnement on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ApprovisionnementDetailComponent);

      // THEN
      expect(instance.approvisionnement()).toEqual(expect.objectContaining({ id: 123 }));
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
