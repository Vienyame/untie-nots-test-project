import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, take, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginValid = true;
  // Username; email here
  public username: string = '';
  // User password
  public password: string = '';
  // Allow to unsubscribe observable
  private _destroySub$ = new Subject<void>();
  // Return url
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/movies';
  }

  public ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      filter((isAuthenticated: boolean) => isAuthenticated),
      takeUntil(this._destroySub$)
    ).subscribe( () => this._router.navigateByUrl(this.returnUrl));
  }

  /**
   * Submit login
   */
  public onSubmit() {
    this.loginValid = false;
    this._authService.login(this.username, this.password)
      .pipe(
      take(1)
    ).subscribe({
      next: (response: any) => {
        console.log(response)
        this._authService.setUserInfo({'user' : response['user']});
        this._router.navigateByUrl('/movies')
          .then(() => this.loginValid = true);
      },
      error: () => this.loginValid = false
    });
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
    this._destroySub$.complete();
  }
}
