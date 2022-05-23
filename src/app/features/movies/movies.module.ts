import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared';
import {MoviesComponent} from './movies.component';
import {MOVIES_ROUTES} from './movies.routes';
import {MovieDetailsComponent} from './components';

@NgModule({
  declarations: [MoviesComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    MOVIES_ROUTES,
    SharedModule,
  ],
})
export class MoviesModule {
}
