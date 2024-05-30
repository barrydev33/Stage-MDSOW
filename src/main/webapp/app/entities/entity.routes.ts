import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'gestionStockApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'categorie',
    data: { pageTitle: 'gestionStockApp.categorie.home.title' },
    loadChildren: () => import('./categorie/categorie.routes'),
  },
  {
    path: 'produit',
    data: { pageTitle: 'gestionStockApp.produit.home.title' },
    loadChildren: () => import('./produit/produit.routes'),
  },
  {
    path: 'fournisseur',
    data: { pageTitle: 'gestionStockApp.fournisseur.home.title' },
    loadChildren: () => import('./fournisseur/fournisseur.routes'),
  },
  {
    path: 'approvisionnement',
    data: { pageTitle: 'gestionStockApp.approvisionnement.home.title' },
    loadChildren: () => import('./approvisionnement/approvisionnement.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
