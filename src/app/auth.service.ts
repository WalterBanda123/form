import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserlogged = new BehaviorSubject<boolean>(false);
  _isUserLogged = this.isUserlogged.asObservable();

  getLoggedUser(token: string) {
    if (token && token !== undefined) {
      this.isUserlogged.next(true);
    } else {
      this.isUserlogged.next(false);
    }
  }

  constructor(private http: HttpClient) {}
  serverUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
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
    return this.http
      .post<any>(this.serverUrl + `users/signup`, newUser)
      .pipe(catchError(this.errorHandler));
  }

  userSignIn(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>(this.serverUrl + `users/login`, credentials)
      .pipe(catchError(this.errorHandler));
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(this.serverUrl + `users/${userId}`)
    .pipe(catchError(this.errorHandler));
  }
}
