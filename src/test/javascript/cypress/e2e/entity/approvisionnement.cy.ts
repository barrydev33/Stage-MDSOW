import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Approvisionnement e2e test', () => {
  const approvisionnementPageUrl = '/approvisionnement';
  const approvisionnementPageUrlPattern = new RegExp('/approvisionnement(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const approvisionnementSample = { date: '2024-05-30T04:51:20.494Z', quantite: 27 };

  let approvisionnement;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/approvisionnements+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/approvisionnements').as('postEntityRequest');
    cy.intercept('DELETE', '/api/approvisionnements/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (approvisionnement) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/approvisionnements/${approvisionnement.id}`,
      }).then(() => {
        approvisionnement = undefined;
      });
    }
  });

  it('Approvisionnements menu should load Approvisionnements page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('approvisionnement');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Approvisionnement').should('exist');
    cy.url().should('match', approvisionnementPageUrlPattern);
  });

  describe('Approvisionnement page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(approvisionnementPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Approvisionnement page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/approvisionnement/new$'));
        cy.getEntityCreateUpdateHeading('Approvisionnement');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', approvisionnementPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/approvisionnements',
          body: approvisionnementSample,
        }).then(({ body }) => {
          approvisionnement = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/approvisionnements+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/approvisionnements?page=0&size=20>; rel="last",<http://localhost/api/approvisionnements?page=0&size=20>; rel="first"',
              },
              body: [approvisionnement],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(approvisionnementPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Approvisionnement page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('approvisionnement');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', approvisionnementPageUrlPattern);
      });

      it('edit button click should load edit Approvisionnement page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Approvisionnement');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', approvisionnementPageUrlPattern);
      });

      it('edit button click should load edit Approvisionnement page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Approvisionnement');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', approvisionnementPageUrlPattern);
      });

      it('last delete button click should delete instance of Approvisionnement', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('approvisionnement').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', approvisionnementPageUrlPattern);

        approvisionnement = undefined;
      });
    });
  });

  describe('new Approvisionnement page', () => {
    beforeEach(() => {
      cy.visit(`${approvisionnementPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Approvisionnement');
    });

    it('should create an instance of Approvisionnement', () => {
      cy.get(`[data-cy="date"]`).type('2024-05-30T03:31');
      cy.get(`[data-cy="date"]`).blur();
      cy.get(`[data-cy="date"]`).should('have.value', '2024-05-30T03:31');

      cy.get(`[data-cy="quantite"]`).type('19538');
      cy.get(`[data-cy="quantite"]`).should('have.value', '19538');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        approvisionnement = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', approvisionnementPageUrlPattern);
    });
  });
});
