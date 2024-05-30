import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApprovisionnement } from '../approvisionnement.model';
import { ApprovisionnementService } from '../service/approvisionnement.service';

const approvisionnementResolve = (route: ActivatedRouteSnapshot): Observable<null | IApprovisionnement> => {
  const id = route.params['id'];
  if (id) {
    return inject(ApprovisionnementService)
      .find(id)
      .pipe(
        mergeMap((approvisionnement: HttpResponse<IApprovisionnement>) => {
          if (approvisionnement.body) {
            return of(approvisionnement.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default approvisionnementResolve;
