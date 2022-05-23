import {RouterModule, Routes} from '@angular/router';
import {MoviesComponent} from './movies.component';
import {MovieDetailsComponent} from './components';

const ROUTES: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'details/:id', component: MovieDetailsComponent},
];
export const MOVIES_ROUTES = RouterModule.forChild(ROUTES);
