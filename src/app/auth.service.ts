import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isLoggedInKey = 'isLoggedIn';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  constructor(private http: HttpClient) {
    const storedValue = localStorage.getItem(this.isLoggedInKey);
    if (storedValue) {
      this._isLoggedIn$.next(JSON.parse(storedValue));
    }
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn$.next(value);
    localStorage.setItem(this.isLoggedInKey, JSON.stringify(value));
  }

  logout() {
    this.isLoggedIn = false; // Update the isLoggedIn value to false
    localStorage.removeItem(this.isLoggedInKey); // Remove the stored value from localStorage
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console
        .error
        // `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        ();
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  //----SIGNING UP A USER---

  userSignUp(newUser: {
    fullName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${environment.serverUrl}` + `/users/signup`,
      newUser
    );
    // .pipe(catchError(this.errorHandler));
  }

  userSignIn(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverUrl}` + `/users/login`, credentials)
      .pipe(catchError(this.errorHandler));
  }

  getUser(userId: string): Observable<any> {
    return this.http

      .get<any>(`${environment.serverUrl}` + `/users/${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  getUsers(): Observable<any> {
    return this.http

      .get<any>(`${environment.serverUrl}` + `/users`)
      .pipe(catchError(this.errorHandler));
  }
}
