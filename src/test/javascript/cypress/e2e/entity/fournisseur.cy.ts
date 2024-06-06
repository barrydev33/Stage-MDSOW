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

describe('Fournisseur e2e test', () => {
  const fournisseurPageUrl = '/fournisseur';
  const fournisseurPageUrlPattern = new RegExp('/fournisseur(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fournisseurSample = { nom: 'tandis que avex subsister', adresse: 'après', contact: 'dense' };

  let fournisseur;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/fournisseurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/fournisseurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/fournisseurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fournisseur) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/fournisseurs/${fournisseur.id}`,
      }).then(() => {
        fournisseur = undefined;
      });
    }
  });

  it('Fournisseurs menu should load Fournisseurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('fournisseur');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Fournisseur').should('exist');
    cy.url().should('match', fournisseurPageUrlPattern);
  });

  describe('Fournisseur page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fournisseurPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Fournisseur page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/fournisseur/new$'));
        cy.getEntityCreateUpdateHeading('Fournisseur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fournisseurPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/fournisseurs',
          body: fournisseurSample,
        }).then(({ body }) => {
          fournisseur = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/fournisseurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/fournisseurs?page=0&size=20>; rel="last",<http://localhost/api/fournisseurs?page=0&size=20>; rel="first"',
              },
              body: [fournisseur],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(fournisseurPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Fournisseur page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fournisseur');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fournisseurPageUrlPattern);
      });

      it('edit button click should load edit Fournisseur page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Fournisseur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fournisseurPageUrlPattern);
      });

      it('edit button click should load edit Fournisseur page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Fournisseur');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fournisseurPageUrlPattern);
      });

      it('last delete button click should delete instance of Fournisseur', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fournisseur').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fournisseurPageUrlPattern);

        fournisseur = undefined;
      });
    });
  });

  describe('new Fournisseur page', () => {
    beforeEach(() => {
      cy.visit(`${fournisseurPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Fournisseur');
    });

    it('should create an instance of Fournisseur', () => {
      cy.get(`[data-cy="nom"]`).type('hystérique porte-parole bè');
      cy.get(`[data-cy="nom"]`).should('have.value', 'hystérique porte-parole bè');

      cy.get(`[data-cy="adresse"]`).type('tard dedans');
      cy.get(`[data-cy="adresse"]`).should('have.value', 'tard dedans');

      cy.get(`[data-cy="contact"]`).type('éclater dissiper');
      cy.get(`[data-cy="contact"]`).should('have.value', 'éclater dissiper');

      cy.setFieldImageAsBytesOfEntity('profil', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="age"]`).type('5966');
      cy.get(`[data-cy="age"]`).should('have.value', '5966');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fournisseur = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fournisseurPageUrlPattern);
    });
  });
});
