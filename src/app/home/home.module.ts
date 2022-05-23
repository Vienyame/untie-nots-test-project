import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {HomeComponent} from './home.component';
import {HOME_ROUTES} from './home.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HOME_ROUTES,
    SharedModule,
  ],
})
export class HomeModule {
}
