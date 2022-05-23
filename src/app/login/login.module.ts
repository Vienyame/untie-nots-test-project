import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {LoginComponent} from './login.component';
import {LOGIN_ROUTES} from './login.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LOGIN_ROUTES,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LoginModule {
}
