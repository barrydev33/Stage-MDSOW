import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApprovisionnement } from '../approvisionnement.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../approvisionnement.test-samples';

import { ApprovisionnementService, RestApprovisionnement } from './approvisionnement.service';

const requireRestSample: RestApprovisionnement = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.toJSON(),
};

describe('Approvisionnement Service', () => {
  let service: ApprovisionnementService;
  let httpMock: HttpTestingController;
  let expectedResult: IApprovisionnement | IApprovisionnement[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApprovisionnementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Approvisionnement', () => {
      const approvisionnement = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(approvisionnement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Approvisionnement', () => {
      const approvisionnement = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(approvisionnement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Approvisionnement', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Approvisionnement', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Approvisionnement', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addApprovisionnementToCollectionIfMissing', () => {
      it('should add a Approvisionnement to an empty array', () => {
        const approvisionnement: IApprovisionnement = sampleWithRequiredData;
        expectedResult = service.addApprovisionnementToCollectionIfMissing([], approvisionnement);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(approvisionnement);
      });

      it('should not add a Approvisionnement to an array that contains it', () => {
        const approvisionnement: IApprovisionnement = sampleWithRequiredData;
        const approvisionnementCollection: IApprovisionnement[] = [
          {
            ...approvisionnement,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addApprovisionnementToCollectionIfMissing(approvisionnementCollection, approvisionnement);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Approvisionnement to an array that doesn't contain it", () => {
        const approvisionnement: IApprovisionnement = sampleWithRequiredData;
        const approvisionnementCollection: IApprovisionnement[] = [sampleWithPartialData];
        expectedResult = service.addApprovisionnementToCollectionIfMissing(approvisionnementCollection, approvisionnement);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(approvisionnement);
      });

      it('should add only unique Approvisionnement to an array', () => {
        const approvisionnementArray: IApprovisionnement[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const approvisionnementCollection: IApprovisionnement[] = [sampleWithRequiredData];
        expectedResult = service.addApprovisionnementToCollectionIfMissing(approvisionnementCollection, ...approvisionnementArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const approvisionnement: IApprovisionnement = sampleWithRequiredData;
        const approvisionnement2: IApprovisionnement = sampleWithPartialData;
        expectedResult = service.addApprovisionnementToCollectionIfMissing([], approvisionnement, approvisionnement2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(approvisionnement);
        expect(expectedResult).toContain(approvisionnement2);
      });

      it('should accept null and undefined values', () => {
        const approvisionnement: IApprovisionnement = sampleWithRequiredData;
        expectedResult = service.addApprovisionnementToCollectionIfMissing([], null, approvisionnement, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(approvisionnement);
      });

      it('should return initial array if no Approvisionnement is added', () => {
        const approvisionnementCollection: IApprovisionnement[] = [sampleWithRequiredData];
        expectedResult = service.addApprovisionnementToCollectionIfMissing(approvisionnementCollection, undefined, null);
        expect(expectedResult).toEqual(approvisionnementCollection);
      });
    });

    describe('compareApprovisionnement', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareApprovisionnement(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareApprovisionnement(entity1, entity2);
        const compareResult2 = service.compareApprovisionnement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareApprovisionnement(entity1, entity2);
        const compareResult2 = service.compareApprovisionnement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareApprovisionnement(entity1, entity2);
        const compareResult2 = service.compareApprovisionnement(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
