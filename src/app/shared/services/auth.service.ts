import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from '../../environment.service';

@Injectable()
export class AuthService {

  constructor(private _router: Router, private http: HttpClient, private environment: EnvironmentService) {
  }

  public get isAuthenticated$(): Observable<boolean> {
    debugger
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return of(true);
    }
    return of(false);
  }

  /**
   * Set user information
   * @param user
   */
  public setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  /**
   * Login to the app
   * @param email
   * @param password
   */
  public login(email: string, password: string) {
    return this.http.post(this.environment.backendURL.authenticate, {'username': email, 'password': password});
  }

  /**
   * Logout
   * @param s
   */
  public logout(s: string) {
    return of(null);
  }
}
