import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {RetraitsComponent} from "../../pages/retraits/retraits.component";
import {DemandDetailsComponent} from "../../pages/demand-details/demand-details.component";
import {RetraitCompteComponent} from "../../pages/retrait-compte/retrait-compte.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'demandes',         component: TablesComponent },
  { path: 'demandes/details/:slug',  component: DemandDetailsComponent},
  { path: 'retraits',         component: RetraitsComponent },
  { path: 'comptes-retraits',         component: RetraitCompteComponent },
  { path: 'icons',          component: IconsComponent },
  { path: 'maps',           component: MapsComponent }
];
