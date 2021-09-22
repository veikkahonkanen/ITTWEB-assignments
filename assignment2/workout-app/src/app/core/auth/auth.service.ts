import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwt } from './jwt.model';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// Auth service inspired by Poul's slides from 9th lecture
export class AuthService {
  private _isLoggedInOrOut$: BehaviorSubject<boolean>;
  private _currentUserId$: BehaviorSubject<string>;

  constructor(private _httpClient: HttpClient) {
    this._isLoggedInOrOut$ = new BehaviorSubject(AuthService.isLoggedIn());
    this._currentUserId$ = new BehaviorSubject(this.obtainCurrentUserId());
  }

  public get onLoggedInOut$(): Observable<boolean> {
    return this._isLoggedInOrOut$.asObservable();
  }

  public get onCurrentUserId$(): Observable<string> {
    return this._currentUserId$.asObservable();
  }
  public get currentUserId(): string{
    return this._currentUserId$.value;
  }


  
  public register(user: User): Observable<User> {
    return this._httpClient.post<User>(
      `${environment.appUrl}auth/register`,
      user
    );
  }

  public login(user: User): Observable<Jwt> {
    return this._httpClient
      .post<Jwt>(`${environment.appUrl}auth/login`, user)
      .pipe(
        tap((data) => {
          AuthService.saveToken(data.token);
          this._isLoggedInOrOut$.next(true);
          this._currentUserId$.next(this.obtainCurrentUserId());
        })
      );
  }

  public logout(): void {
    AuthService.deleteToken();
    this._isLoggedInOrOut$.next(false);
    this._currentUserId$.next("");
  }

  public get authToken(): string {
    return AuthService.getToken();
  }

  private static isLoggedIn(): boolean {
    const token = AuthService.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private obtainCurrentUserId(): string {
    if (this._isLoggedInOrOut$.value) {
      const token = AuthService.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload._id;
    } else {
      return undefined;
    }
  }

  private static saveToken(token: string): void {
    window.localStorage['jwt'] = token;
  }

  private static getToken(): string {
    if (window.localStorage['jwt']) {
      return window.localStorage['jwt'];
    } else {
      return '';
    }
  }

  private static deleteToken(): void {
    window.localStorage.setItem('jwt', '');
  }
}
