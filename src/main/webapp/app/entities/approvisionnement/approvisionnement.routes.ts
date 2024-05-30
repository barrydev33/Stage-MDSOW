import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ApprovisionnementComponent } from './list/approvisionnement.component';
import { ApprovisionnementDetailComponent } from './detail/approvisionnement-detail.component';
import { ApprovisionnementUpdateComponent } from './update/approvisionnement-update.component';
import ApprovisionnementResolve from './route/approvisionnement-routing-resolve.service';

const approvisionnementRoute: Routes = [
  {
    path: '',
    component: ApprovisionnementComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApprovisionnementDetailComponent,
    resolve: {
      approvisionnement: ApprovisionnementResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApprovisionnementUpdateComponent,
    resolve: {
      approvisionnement: ApprovisionnementResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApprovisionnementUpdateComponent,
    resolve: {
      approvisionnement: ApprovisionnementResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default approvisionnementRoute;
