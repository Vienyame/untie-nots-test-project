import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
];
export const LOGIN_ROUTES = RouterModule.forChild(ROUTES);
