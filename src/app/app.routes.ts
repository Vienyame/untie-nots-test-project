import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './shared';

const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
  {path: 'movies', canActivate: [AuthGuard], loadChildren: () => import('./features/movies/movies.module').then((m) => m.MoviesModule)},
  {path: '**', component: NotFoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash: true, relativeLinkResolution: 'legacy'});
