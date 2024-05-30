import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApprovisionnement, NewApprovisionnement } from '../approvisionnement.model';

export type PartialUpdateApprovisionnement = Partial<IApprovisionnement> & Pick<IApprovisionnement, 'id'>;

type RestOf<T extends IApprovisionnement | NewApprovisionnement> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestApprovisionnement = RestOf<IApprovisionnement>;

export type NewRestApprovisionnement = RestOf<NewApprovisionnement>;

export type PartialUpdateRestApprovisionnement = RestOf<PartialUpdateApprovisionnement>;

export type EntityResponseType = HttpResponse<IApprovisionnement>;
export type EntityArrayResponseType = HttpResponse<IApprovisionnement[]>;

@Injectable({ providedIn: 'root' })
export class ApprovisionnementService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/approvisionnements');

  create(approvisionnement: NewApprovisionnement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvisionnement);
    return this.http
      .post<RestApprovisionnement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(approvisionnement: IApprovisionnement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvisionnement);
    return this.http
      .put<RestApprovisionnement>(`${this.resourceUrl}/${this.getApprovisionnementIdentifier(approvisionnement)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(approvisionnement: PartialUpdateApprovisionnement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvisionnement);
    return this.http
      .patch<RestApprovisionnement>(`${this.resourceUrl}/${this.getApprovisionnementIdentifier(approvisionnement)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestApprovisionnement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestApprovisionnement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getApprovisionnementIdentifier(approvisionnement: Pick<IApprovisionnement, 'id'>): number {
    return approvisionnement.id;
  }

  compareApprovisionnement(o1: Pick<IApprovisionnement, 'id'> | null, o2: Pick<IApprovisionnement, 'id'> | null): boolean {
    return o1 && o2 ? this.getApprovisionnementIdentifier(o1) === this.getApprovisionnementIdentifier(o2) : o1 === o2;
  }

  addApprovisionnementToCollectionIfMissing<Type extends Pick<IApprovisionnement, 'id'>>(
    approvisionnementCollection: Type[],
    ...approvisionnementsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const approvisionnements: Type[] = approvisionnementsToCheck.filter(isPresent);
    if (approvisionnements.length > 0) {
      const approvisionnementCollectionIdentifiers = approvisionnementCollection.map(approvisionnementItem =>
        this.getApprovisionnementIdentifier(approvisionnementItem),
      );
      const approvisionnementsToAdd = approvisionnements.filter(approvisionnementItem => {
        const approvisionnementIdentifier = this.getApprovisionnementIdentifier(approvisionnementItem);
        if (approvisionnementCollectionIdentifiers.includes(approvisionnementIdentifier)) {
          return false;
        }
        approvisionnementCollectionIdentifiers.push(approvisionnementIdentifier);
        return true;
      });
      return [...approvisionnementsToAdd, ...approvisionnementCollection];
    }
    return approvisionnementCollection;
  }

  protected convertDateFromClient<T extends IApprovisionnement | NewApprovisionnement | PartialUpdateApprovisionnement>(
    approvisionnement: T,
  ): RestOf<T> {
    return {
      ...approvisionnement,
      date: approvisionnement.date?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restApprovisionnement: RestApprovisionnement): IApprovisionnement {
    return {
      ...restApprovisionnement,
      date: restApprovisionnement.date ? dayjs(restApprovisionnement.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestApprovisionnement>): HttpResponse<IApprovisionnement> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestApprovisionnement[]>): HttpResponse<IApprovisionnement[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
