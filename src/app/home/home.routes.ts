import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
];
export const HOME_ROUTES = RouterModule.forChild(ROUTES);
